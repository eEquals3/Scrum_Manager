"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./sprints.css"
import {AuthContext} from "../../provider/AuthProvider";
import {
    collection, doc,
    DocumentData, getDoc, getDocs, increment,
    limit,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Timestamp,
    where
} from "firebase/firestore";
import {db} from "../../services/Firebase";
import CommandButton from "../../../components/CommandButton/CommandButton";
import {updateDoc} from "@firebase/firestore";
import Sprint from "../../../components/Sprint/Sprint";
import TaskButton from "../../../components/TaskButton/TaskButton";

const Sprints = () => {

    const {user}: any = AuthContext();
    const userInfo = user.user;

    const [sprints, setSprints] = useState<DocumentData[]>()
    const [sprintsLimit, setSprintsLimit] = useState<number>(5)
    const [currentCommandId, setCurrentCommandId] = useState("")
    const [currentSprint, setCurrentSprint] = useState("")
    const [commands, setCommands] = useState<DocumentData[]>([])
    const [addSprintState, setAddSprintState] = useState<boolean>(false)
    const tasks = [{name: 123, id: 123}, {name: 1234, id: 1234}, {name: 1235, id: 1235}, {
        name: 234,
        id: 234
    }, {name: 2345, id: 2345}, {name: 23456, id: 23456}]

    const [selectedTasks, setSelectedTasks] = useState<DocumentData[]>([])

    const sprintsQuery = useMemo(() => {
        return query(collection(db, "users", userInfo?.uid, "sprints"), where("commandId", "==", currentCommandId), orderBy("creationDate", "desc"), limit(sprintsLimit));
    }, [currentCommandId, sprintsLimit, userInfo?.uid])

    useEffect(() => {
        const unsubscribe = onSnapshot(sprintsQuery, (snapshot => {
            const updatedSprints = snapshot.docs.map((doc) => doc.data())
            setSprints(updatedSprints);
        }))
        return () => unsubscribe();
    }, [sprintsQuery, userInfo.uid])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users", userInfo?.uid, "commands"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCommands(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo?.uid])

    const renderCommand = useCallback((command: DocumentData) => {
        return <CommandButton key={command.id} CommandId={command.id} CommandName={command.name}
                              onTaskClickFunc={setCurrentCommandId}/>
    }, [])

    const renderSprint = useCallback((sprint: DocumentData) => {
        return <Sprint sprint={sprint} userUID={userInfo?.uid} key={sprint.id}/>
    }, [userInfo?.uid])

    const renderTask = useCallback((task: DocumentData) => {
        return <TaskButton key={task.id} taskName={task.name} taskId={task.id}/>
    }, [])

    const addSprint = useCallback(async () => {
        try {
            const userDoc = await getDoc(doc(db, "users", userInfo?.uid))
            const lastSprintNumber = userDoc.data().lastSprint
            try {
                const sprintid = crypto.randomUUID()
                await setDoc(doc(db, "users", userInfo?.uid, "sprints", sprintid), ({
                    id: sprintid,
                    number: lastSprintNumber,
                    commandId: currentCommandId,
                    creationDate: Timestamp.now(),
                    sprintState: "during"
                }) as DocumentData)
            } catch (errors) {
                console.log('errors', JSON.stringify(errors, null, 2));
            }
            await updateDoc(doc(db, "users", userInfo?.uid), {
                lastSprint: increment(1)
            })
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [currentCommandId, userInfo?.uid])

    const updateSprintsLimit = useCallback(() => {
        setSprintsLimit(sprintsLimit + 5);
    }, [sprintsLimit])

    return (
        <div>
            <div>
                <h1> Спринты
                    <a>
                        список команд
                        <div>
                            {commands.map(renderCommand)}
                        </div>
                    </a>
                </h1>
                {currentCommandId != "" ? (
                    <span>
                        <div>
                            <button onClick={setAddSprintState}> + </button>
                            {sprints?.map(renderSprint)}
                            <button onClick={updateSprintsLimit}> {" > "} </button>
                        </div>
                        {addSprintState ? (
                            <span>
                                <span>
                                    <p>Список задач</p>
                                    <div className="TaskList">
                                        {tasks.map(renderTask)}
                                    </div>
                                </span>
                                <span>
                                    <p>Выбранные задачи</p>
                                    <div className="TaskList">
                                        {tasks.map(renderTask)}
                                    </div>
                                </span>
                            </span>
                        ) : null}
                    </span>
                ) : null}
            </div>
        </div>
    )
}

export default memo(Sprints)
