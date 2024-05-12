"use client"
import React, {memo, useCallback, useEffect, useState} from "react";
import {collection, doc, DocumentData, getDocs, onSnapshot, query, where} from "firebase/firestore";
import dayjs from "dayjs";
import {db} from "../../app/services/Firebase";
import "./Sprint.css"
import {updateDoc} from "@firebase/firestore";

interface Props {
    sprint: DocumentData,
    userUID?: any,
}

const Sprint = ((Prop: Props) => {

    const [currentTasks, setCurrentTasks] = useState<DocumentData[]>([])
    const [sprintState, setSprintState] = useState<string>(Prop.sprint.sprintState)
    const header = Prop.sprint.number
    const startDate = dayjs(Prop.sprint.creationDate.toDate()).format("DD-MM-YYYY")
    const endDate = dayjs(Prop.sprint.creationDate.toDate()).add(14, "days").format("DD-MM-YYYY")
    const taskQuery = query(collection(db, "users", Prop.userUID, "tasks"), where("sprint", "==", Prop.sprint.id))

    useEffect(() => {
        console.log(Prop.sprint.id + 'sprintState', JSON.stringify(sprintState, null, 2));
    }, [sprintState]);

    const onTaskClick = useCallback((task:DocumentData)=>{
        try{
            updateDoc(doc(db, "users", Prop.userUID, "tasks", task.id), {
                completed: true
            }as DocumentData).then((r)=>{console.log("задача <<" + task.name + ">> закрыта");})
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    },[Prop.userUID])

    const renderTask = useCallback((task: DocumentData) => {
        return <button className="Task" key={task.id} onClick={()=>{onTaskClick(task)}} disabled={!!task.completed}> {task.name} </button>
    }, [onTaskClick])

    useEffect(() => {
        const unsubscribe = onSnapshot(taskQuery, (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            console.log('updatedTasks', JSON.stringify(updatedTasks, null, 2));
            setCurrentTasks(updatedTasks);
        }))
        return () => unsubscribe();
    }, [])

    const endingSprint = useCallback(()=>{
        try{
            updateDoc(doc(db, "users", Prop.userUID, "sprints", Prop.sprint.id),{
                sprintState: "completed"
            }as DocumentData).then(()=>{
                setSprintState("completed")
            })
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
        try {
            currentTasks.map((task)=>{
                if (task.completed != true ){
                    updateDoc(doc(db, "users", Prop.userUID, "tasks", task.id), {
                        sprint: ""
                    }as DocumentData).then(()=>{console.log("задача <<" + task.name + ">> не выполнена, поэтому убрана из спринта")})
                }
            })
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    },[])

    return (
        <div className="Sprint" key={Prop.sprint.id}>
            <h1> Спринт №{header} </h1>
            <div> Дата создания: {startDate}</div>
            <div> Дата окончания: {endDate}</div>
            <span>
                <div className="TaskScroll">
                    {currentTasks.map(renderTask)}
                </div>
            </span>
            {sprintState === "during"? (<button onClick={endingSprint}>Закончить спринт</button>) : null}
            {sprintState === "completed"? (<div>Спринт завершен</div>) : null}
        </div>
    )
})

export default memo(Sprint);
