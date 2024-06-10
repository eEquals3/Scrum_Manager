"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {collection, doc, DocumentData, onSnapshot, query, Timestamp, where} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../app/services/Firebase";
import "./Sprint.css"
import {updateDoc} from "@firebase/firestore";

interface Props {
    sprint: DocumentData,
    userUID?: any,
    taskClickFunc: (task: DocumentData) => void;
    taskClickSetView: (b: boolean) => void;
    num: number
}


const Sprint = ((props: Props) => {

    const checkColor = (score: number) => {
        switch (true) {
            case (score <= 2):
                return "#22ff00";
            case (score <= 3):
                return "#76eb00";
            case (score <= 4):
                return "#9fd600";
            case (score <= 5):
                return "#bac100";
            case (score <= 6):
                return "#cfaa00";
            case (score <= 7):
                return "#e19000";
            case (score <= 8):
                return "#f17100";
            case (score <= 9):
                return "#fb4c00";
            case (score <= 10):
                return "#ff0000";
            default:
        }
    };

    const [sprintState, setSprintState] = useState<string>(props.sprint.sprintState)
    const header = props.sprint.number
    const startDate = dayjs(props.sprint.creationDate.toDate()).format("DD-MM-YYYY")
    const endDate = dayjs(props.sprint.creationDate.toDate()).add(14, "days").format("DD-MM-YYYY")
    const taskQuery = query(collection(db, "users", props.userUID, "tasks"), where("sprint", "==", props.sprint.id))
    const [uncompletedTasks, setUncompletedTasks] = useState<DocumentData[]>(props.sprint.uncomletedTasks || [])
    const [currentTasks, setCurrentTasks] = useState<DocumentData[]>([])

    useEffect(() => {
        console.log(props.sprint.id + 'sprintState', JSON.stringify(sprintState, null, 2));
    }, [sprintState]);

    useEffect(() => {
        const unsubscribe = onSnapshot(taskQuery, (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCurrentTasks(updatedTasks);
            console.log('updatedTasks', JSON.stringify(updatedTasks, null, 2));
        }))
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        console.log('uncompletedTasks', JSON.stringify(uncompletedTasks, null, 2));
    }, [uncompletedTasks]);

    const onTaskClick = useCallback((task: DocumentData) => {
        props.taskClickFunc(task)
        props.taskClickSetView(false)
        console.log('task', JSON.stringify(task, null, 2));
    }, [props])

    const renderTask = useCallback((task: DocumentData) => {
        return <button className={task.completed === false ? "Task" : "TaskCompleted"} key={`Task ${task.id}`}
                       onClick={() => onTaskClick(task)}>
            {task.name}
            {task.completedDate ?
                <div key={`TaskDate ${task.id}`}>
                    {`дата выполнения: ${task.completedDate}`}
                </div> : null}
            <div className="Score" style={task.score ? {
                background: checkColor(task.score),
                color: "var(--main-text-color)"
            } : undefined}> {task.score ? "Сложность: " + task.score : "Сложность неизвестна"} </div>
        </button>
    }, [onTaskClick])

    const renderFailedTask = useCallback((task: DocumentData) => {
        return <button className="FailedTask" key={"FailedTask" + task.id} disabled={true}> {task.name} {task.score ?
            <div className="Score" style={task.score ? {
                background: checkColor(task.score),
                color: "var(--main-text-color)"
            } : undefined}> {task.score ? "Сложность: " + task.score : "Сложность неизвестна"} </div> : null}
        </button>
    }, [])

    const sprintScore = useMemo(() => {
        return currentTasks.reduce((acc, task) => {
            acc += task.score ? task.score : 0
            return acc
        }, 0)
    }, [currentTasks])

    const endingSprint = useCallback(async () => {

        const UncompletedTasksArray: DocumentData[] = []
        const timeNow = dayjs(Timestamp.now().toDate()).format("DD-MM-YYYY")

        console.log('currentTasks', JSON.stringify(currentTasks, null, 2));

        try {
            for (const task of currentTasks) {
                if (task.completed != true) {
                    UncompletedTasksArray.push(task)
                    await updateDoc(doc(db, "users", props.userUID, "tasks", task.id), {
                        sprint: ""
                    } as DocumentData)
                    console.log("задача <<" + task.name + ">> не выполнена, поэтому убрана из спринта")
                }
            }

            console.log('UncompletedTasksArray', JSON.stringify(UncompletedTasksArray, null, 2));

            await updateDoc(doc(db, "users", props.userUID, "sprints", props.sprint.id), {
                uncomletedTasks: UncompletedTasksArray,
                completedDate: timeNow,
                sprintState: "completed",
                score: sprintScore
            } as DocumentData)
            console.log("добавлен список незавершенных задач")
            setSprintState("completed")
            setUncompletedTasks([...UncompletedTasksArray])
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
            alert("что-то пошло не так, попробуйте снова")
        }

    }, [currentTasks, props.userUID, props.sprint.id, sprintScore])

    const tasksCountString: string = useMemo(() => {
        const tasksCount = currentTasks?.length + uncompletedTasks?.length;
        return (
            `${currentTasks?.length} из ${tasksCount}`
        )
    }, [currentTasks?.length, uncompletedTasks?.length])

    return (
        // @ts-ignore
        <div className="Sprint" key={props.sprint.id} style={{'--n': `${props.num}s`}}>
            <div className="SprintHeader">
                <h1> Спринт №{header} </h1>
                <div key={"DateStart" + props.sprint.id}> Дата создания: {startDate}</div>
                <div key={"DateEnd" + props.sprint.id}> Дата окончания: {endDate}</div>
            </div>
            <span>
                <div className="TaskScroll">
                    {currentTasks.map(renderTask)}
                    {uncompletedTasks?.map(renderFailedTask)}
                </div>
            </span>
            <div className="SprintFooter">
                {sprintState === "during" ? (<button onClick={endingSprint}>Закончить спринт</button>) : null}
                {sprintState === "completed" ? (<div key={"SprintEnd" + props.sprint.id}>Спринт завершен</div>) : null}
                {sprintState === "completed" ? (
                    <div key={"TaskCompleted" + props.sprint.id}>{"задач выполнено: " + tasksCountString}</div>) : null}
                <div> {`Сложность спринта: ${sprintScore}`} </div>
            </div>

        </div>
    )
})

export default memo(Sprint);
