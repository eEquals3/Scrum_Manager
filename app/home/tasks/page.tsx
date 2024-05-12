"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./tasks.css"
import TaskButton from "../../../components/TaskButton/TaskButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {taskSchema} from "../../validationSchema/taskSchema";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import {InputField, InputArea} from "../../../components/InputField/InputField";
import {collection, deleteDoc, doc, DocumentData, onSnapshot, query, setDoc, where} from "firebase/firestore";
import {db} from "../../services/Firebase";
import {AuthContext} from "../../provider/AuthProvider";
import {updateDoc} from "@firebase/firestore";

const Tasks = () => {
    const [currentTaskID, setCurrentTaskID] = useState<string>("")
    const [taskState, setTaskState] = useState<string>("display")

    const {user}: any = AuthContext();
    const userInfo = user.user;

    const {handleSubmit, register, formState: {errors}, getValues, resetField} = useForm({
        resolver: yupResolver(taskSchema)
    })

    const [tasks, setTasks] = useState<DocumentData[]>([])

    const taskQuery = query(collection(db, "users", userInfo?.uid, "tasks"), where("sprint", "==", ""))

    useEffect(() => {
        const unsubscribe = onSnapshot(taskQuery, (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setTasks(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo.uid])

    useEffect(() => {
        if (currentTask?.name != "") {
            setTaskState("display")
        }
    }, [currentTaskID])

    useEffect(() => {
        console.log('tasks', JSON.stringify(tasks, null, 2));
    }, [tasks]);

    /*useEffect(()=>{
        console.log('taskState', JSON.stringify(taskState, null, 2));
        console.log('currentTaskID', JSON.stringify(currentTaskID, null, 2));
        console.log('currentTask', JSON.stringify(currentTask, null, 2));
    }, [currentTaskID, taskState])
     */

    /*
    useEffect(() => {
        let taskMassive = []
        const Receive = async () => {
            const snapshot = await getDocs(collection(db, "users", userInfo.uid, "tasks"));
            snapshot.forEach((doc) => {
                taskMassive.push(doc.data())
            })
            setTasks(taskMassive);
        }
        Receive().catch((errors)=>{console.log('errors', JSON.stringify(errors, null, 2));})
    }, [userInfo.uid])
     */

    const renderTask = useCallback((task: DocumentData) => {
        return <TaskButton key={task.id} taskName={task.name} taskId={task.id} onTaskClickFunc={setCurrentTaskID}/>
    }, [])

    const onAddTaskClick = useCallback(async () => {
        const taskid = crypto.randomUUID()
        try {
            await setDoc(doc(db, "users", userInfo?.uid, "tasks", taskid), {
                id: taskid,
                name: "Новая задача",
                description: "",
                sprint: ""
            } as DocumentData)
            setCurrentTaskID(taskid)
            setTaskState("redact")
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [userInfo?.uid])

    const onRedactClick = useCallback(() => {
        resetField("name")
        resetField("description")
        setTaskState("redact")
    }, [])

    const onSaveClick = useCallback(async () => {
        try {
            const values = getValues()
            await updateDoc(doc(db, "users", userInfo?.uid, "tasks", currentTaskID), {
                name: values["name"],
                description: values["description"],
            } as DocumentData)
            setTaskState("display")
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
        setTaskState("display")
    }, [currentTaskID, getValues, userInfo?.uid])

    const onDeleteClick = useCallback(async () => {
        try {
            await deleteDoc(doc(db, "users", userInfo?.uid, "tasks", currentTaskID))
            setCurrentTaskID("")
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [currentTaskID, userInfo?.uid])

    const currentTask = useMemo(() => {
        return (tasks.find((task) => (
            task.id === currentTaskID)))
    }, [currentTaskID, tasks])

    return (
        <div>
            <div>
                <h1> Задачи </h1>
                <span>
                    <span>
                        <span>
                            {tasks.map(renderTask)}
                            <button className="TaskButton" onClick={onAddTaskClick}> + </button>
                        </span>
                    </span>
                    <div>
                        {taskState === "display" && currentTaskID != "" ? (
                            <>
                                <h1>
                                    {currentTask?.name}
                                </h1>
                                <div>{currentTask?.description}</div>
                                <p>
                                    <SubmitButton onClickFunk={onDeleteClick} label={"удалить"}/>
                                    <SubmitButton onClickFunk={onRedactClick} label="редактировать"/>
                                </p>
                            </>
                        ) : null}
                        {taskState === "redact" && currentTaskID != "" ? (
                            <form onSubmit={handleSubmit(onSaveClick)}>
                                <h1>
                                    Имя задачи
                                    <InputField register={register} name="name" label="" type="text"
                                                placeholder={""} error={errors.name} defaultValue={currentTask?.name}/>
                                </h1>
                                <div>
                                    Описание задачи
                                    <InputArea register={register} name="description" label=""
                                                placeholder={""} defaultValue={currentTask?.description}/>
                                </div>
                                <SubmitButton label="Сохранить"/>
                            </form>
                        ) : null}
                    </div>
                </span>
            </div>
        </div>
    )
}

export default memo(Tasks)
