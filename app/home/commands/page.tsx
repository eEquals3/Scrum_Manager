"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./commands.css"
import {collection, doc, DocumentData, onSnapshot, setDoc} from "firebase/firestore";
import {AuthContext} from "../../provider/AuthProvider";
import {db} from "../../services/Firebase";
import CommandButton from "../../../components/CommandButton/CommandButton";
import PenIcon from "../../../public/icons/pen/PenIcon";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {commandNameSchema} from "../../validationSchema/commandSchema"
import InputField from "../../../components/InputField/InputField";


const Commands = () => {
    const {user}: any = AuthContext();
    const userInfo = user.user;

    const [currentCommandId, setCurrentCommand] = useState<string>("")
    const [commands, setCommands] = useState<DocumentData[]>([])
    const [commandState, setCommandState] = useState<string>("display")

    const {handleSubmit, register, getValues, formState: {errors}, resetField} = useForm({
        resolver: yupResolver(commandNameSchema),
    })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users", userInfo?.uid, "commands"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCommands(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo?.uid])

    const createCommands = useCallback((command: DocumentData) => {
        return <CommandButton key={command.id} CommandId={command.id} CommandName={command.name}
                              onTaskClickFunc={setCurrentCommand}/>
    }, [])

    const onAddCommandClick = useCallback(async () => {
        const commandid = crypto.randomUUID()
        try {
            await setDoc(doc(db, "users", userInfo?.uid, "commands", commandid), {
                id: commandid,
                name: "Новая команда"
            } as DocumentData)
            setCurrentCommand(commandid)
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
    }, [userInfo?.uid])

    const currentCommand = useMemo(() => {
        return (
            commands.find((command) => (
                command.id === currentCommandId
            ))
        )
    }, [commands, currentCommandId])

    return (
        <div>
            <div>
                <h1> Команды
                    <a>
                        список команд
                        <div>
                            {commands.map(createCommands)}
                            <button onClick={onAddCommandClick}> +</button>
                        </div>
                    </a>
                </h1>
                {currentCommandId != "" ? (
                    <span>
                        <form onSubmit={handleSubmit}>
                            {commandState === "display" ? (currentCommand.name) : null}
                            {commandState === "redact" ?
                                <InputField name="commandName" type="text" placeholder="" label="Название команды"
                                            register={register} defaultValue={currentCommand.name}/> : null}
                            <PenIcon onClickFunk={setCommandState} onClickState="redact"/>
                        </form>
                        {currentCommandId}
                    </span>
                ) : null}
            </div>
        </div>
    )
}

export default memo(Commands)
