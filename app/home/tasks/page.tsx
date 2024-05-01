"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./tasks.css"
import TaskButton from "../../../components/TaskButton/TaskButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {taskSchema} from "../../validationSchema/taskSchema";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import InputField from "../../../components/InputField/InputField";
import {collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../services/Firebase";
import {AuthContext} from "../../provider/AuthProvider";
import {updateDoc} from "@firebase/firestore";

const Tasks = () => {
    const [currentTaskID, setCurrentTaskID] = useState("")
    const [taskState, setTaskState] = useState("display")

    const {user}: any = AuthContext();
    const userInfo = user.user;

    const {handleSubmit, register, formState: {errors}, getValues} = useForm({
        resolver: yupResolver(taskSchema)
    })

    const [tasks, setTasks] = useState<DocumentData[]>([])

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, "users", userInfo.uid, "tasks"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setTasks(updatedTasks);
        }))
        return ()=> unsubscribe();
    }, [userInfo.uid])

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

    const createTask = useCallback((task: DocumentData) => {
        return <TaskButton key={task.id} taskName={task.name} taskId={task.id} taskDescription={task.description}
                           onTaskClickFunc={setCurrentTaskID}/>
    }, [])

    const onAddTaskClick = useCallback(async () => {
        const taskid = crypto.randomUUID()
        try {
            await setDoc(doc(db, "users", userInfo.uid, "tasks", taskid), {
                id: taskid,
                name: "",
                description: ""
            } as DocumentData)
            setCurrentTaskID(taskid)
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [userInfo?.uid])

    const onRedactClick = useCallback(() => {
        setTaskState("redact")
    }, [])

    const onSaveClick = useCallback(async () => {
        try {
            const values = getValues()
            await updateDoc(doc(db, "users", userInfo.uid, "tasks", currentTaskID), {
                name: values["name"],
                description: values["description"],
            } as DocumentData)
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
        setTaskState("display")
    }, [currentTaskID, getValues, userInfo.uid])

    const onDeleteClick = useCallback(async () => {
        try {
            await deleteDoc(doc(db, "users", userInfo.uid, "tasks", currentTaskID))
            setCurrentTaskID("")
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [currentTaskID, userInfo.uid])

    const getTask = useMemo(() => {
        setTaskState("display")
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
                            {tasks.map(createTask)}
                            <button className="TaskButton" onClick={onAddTaskClick}> + </button>
                        </span>
                    </span>
                    <div>
                        {taskState === "display" && currentTaskID != ""? (
                            <>
                                <h1>
                                    {getTask?.name}
                                </h1>
                                <div>{getTask?.description}</div>
                                <p>
                                    <SubmitButton onClickFunk={onDeleteClick} label={"удалить"} />
                                    <SubmitButton onClickFunk={onRedactClick} label="редактировать"/>
                                </p>
                            </>
                        ) : null}
                        {taskState === "redact" && currentTaskID != ""? (
                            <form onSubmit={handleSubmit(onSaveClick)}>
                                <h1>
                                    Имя задачи
                                    <InputField register={register} name="name" label="" type="text"
                                                placeholder={""} error={errors.name} defaultValue={getTask?.name}/>
                                </h1>
                                <div>
                                    Описание задачи
                                    <InputField register={register} name="description" label="" type="text"
                                                placeholder={""} defaultValue={getTask?.description}/>
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
