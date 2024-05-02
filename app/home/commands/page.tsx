"use client"
import React, {memo, useCallback, useEffect, useState} from "react";
import "./commands.css"
import {collection, doc, DocumentData, onSnapshot, setDoc} from "firebase/firestore";
import {AuthContext} from "../../provider/AuthProvider";
import {db} from "../../services/Firebase";
import CommandButton from "../../../components/CommandButton/CommandButton";

const Commands = () => {
    const [currentCommandId, setCurrentCommand] = useState("")
    const [commands, setCommands] = useState<DocumentData[]>([])

    const {user}: any = AuthContext();
    const userInfo = user.user;

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users", userInfo?.uid, "commands"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCommands(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo?.uid])

    useEffect(() => {
        console.log('currentCommandId', JSON.stringify(currentCommandId, null, 2));
    }, [currentCommandId]);

    const createCommands = useCallback((command):DocumentData => {
        return <CommandButton key = {command.id} CommandId={command.id} CommandName={command.name} onTaskClickFunc={setCurrentCommand}/>
    }, [])

    const onAddCommandClick = useCallback(async ()=>{
        const commandid = crypto.randomUUID()
        try{
            await setDoc(doc(db, "users", userInfo?.uid, "commands", commandid), {
                id: commandid,
                name: "Новая команда"
            }as DocumentData)
            setCurrentCommand(commandid)
        }
        catch (errors){
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    },[userInfo?.uid])

    return (
        <div>
            <div>
                <h1> Команды </h1>
                <div>
                    <a>
                        список команд
                        <div>
                            {commands.map(createCommands)}
                            <button onClick={onAddCommandClick}> + </button>
                        </div>
                    </a>
                </div>
                <span>
                    {currentCommandId}
                </span>
            </div>
        </div>
    )
}

export default memo(Commands)
