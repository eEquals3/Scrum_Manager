"use client"
import React, {memo, useCallback, useMemo, useState} from "react";
import "./tasks.css"
import TaskButton from "../../../components/TaskButton/TaskButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {taskSchema} from "../../validationSchema/taskSchema";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import InputField from "../../../components/InputField/InputField";

interface Task {
    id: string
    name: string,
    description: string,
}

const Tasks = () => {
    const [currentTaskID, setCurrentTaskID] = useState("")
    const [taskState, setTaskState] = useState("display")

    const {handleSubmit, register, formState: {errors: Error}} = useForm({
        resolver: yupResolver(taskSchema)
    })

    const [testTasks, setTestTask] = useState([{
        id: crypto.randomUUID(),
        name: "1",
        description: "sdfhskdfhsjdhfjs hfhdfhdfhsdfhdjfsdhfhesuhfd jsfhdjfhsjdhfjsdhfjkhsdf jhdjhfjsdhfjhdfkjs hfjdhfjhsjdhfjshdfjkshfk jhskjdhfjkhdjshf kjdhskjfhdjhfs asdasdasdasdadawdasdads"
    }, {
        id: crypto.randomUUID(),
        name: "2",
        description: "234"
    }])

    const createTask = useCallback((task: Task) => {
        return <TaskButton taskName={task.name} taskId={task.id} taskDescription={task.description}
                           onTaskClickFunc={setCurrentTaskID}/>
    }, [])

    const onAddTaskClick = useCallback(() => {
        return (
            setTestTask([...testTasks, {id: crypto.randomUUID(), name: "", description: ""}])
        )
    }, [testTasks])

    const onRedactClick = useCallback(() => {
        setTaskState("redact")
    }, [])

    const onSaveClick = useCallback(() => {
        setTaskState("display")
    }, [])

    const getTask = useMemo(() => {
        setTaskState("display")
        return (testTasks.find((task: Task) => (
            task.id === currentTaskID)))
    }, [currentTaskID, testTasks])

    return (
        <div>
            <div>
                <h1> Задачи </h1>
                <span>
                    <span>
                        <span>
                            {testTasks.map(createTask)}
                            <button className="TaskButton" onClick={onAddTaskClick}> + </button>
                        </span>
                    </span>
                    <div>
                        {taskState === "display" ? (
                            <>
                                <h1>
                                    {getTask?.name}
                                </h1>
                                <div>{getTask?.description}</div>
                                <SubmitButton onClickFunk={onRedactClick} label="Редактировать"/>
                            </>
                        ) : null}
                        {taskState === "redact" ? (
                            <form onSubmit={handleSubmit(onSaveClick)}>
                                <h1>
                                    Имя задачи
                                    <InputField register={register} name="name" label="" type="text" placeholder={getTask?.name}/>
                                </h1>
                                <div>
                                    Описание задачи
                                    <InputField register={register} name="description" label="" type="text" placeholder={getTask?.description}/>
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
