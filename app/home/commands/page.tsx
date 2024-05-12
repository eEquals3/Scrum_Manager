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
import SaveIcon from "../../../public/icons/save/SaveIcon";
import {updateDoc} from "@firebase/firestore";


const Commands = () => {
    const {user}: any = AuthContext();
    const userInfo = user.user;

    const [currentCommandId, setCurrentCommand] = useState<string>("")
    const [commands, setCommands] = useState<DocumentData[]>([])
    const [commandState, setCommandState] = useState<string>("display")

    const {register, getValues, formState: {errors}, resetField, trigger} = useForm({
        resolver: yupResolver(commandNameSchema),
    })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users", userInfo?.uid, "commands"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCommands(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo?.uid])

    useEffect(() => {
        resetField("commandName")
        setCommandState("display")
    }, [currentCommandId])


    const renderCommand = useCallback((command: DocumentData) => {
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

    const updateCommand = useCallback(async () => {
        try {
            const values = getValues()
            await updateDoc(doc(db, "users", userInfo?.uid, "commands", currentCommandId), {
                name: values["name"]
            } as DocumentData)
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }
        setCommandState("display")
    }, [currentCommandId, getValues, userInfo?.uid])

    const onSaveClick = useCallback(() => {
        try {
            trigger("name").then(() => {
                console.log('поля проверены');
                console.log('errors.name', JSON.stringify(errors.name, null, 2));
                if (!errors.name) {
                    updateCommand().catch((errors) => {
                        console.log('errors', JSON.stringify(errors, null, 2));
                    })
                }
            }).catch((errors) => {
                console.log('errors', JSON.stringify(errors, null, 2));
            })
        } catch (errors) {
            console.log('errors', JSON.stringify(errors, null, 2));
        }

    }, [errors, trigger, updateCommand])

    return (
        <div>
            <div>
                <h1> Команды
                    <a>
                        список команд
                        <div>
                            {commands.map(renderCommand)}
                            <button onClick={onAddCommandClick}> +</button>
                        </div>
                    </a>
                </h1>
                {currentCommandId != "" ? (
                    <span>
                        <form>
                            {commandState === "display" ? (
                                <>
                                    {currentCommand.name}
                                    <PenIcon onClickFunk={setCommandState} onClickState="redact"/>
                                </>) : null}
                            {commandState === "redact" ?
                                (<>
                                    <div>
                                        <InputField name="name" type="text" placeholder={""} label=""
                                                    register={register} defaultValue={currentCommand.name}
                                                    error={errors.name}/>
                                    </div>
                                    <SaveIcon onClickFunk={onSaveClick}/>
                                </>) : null}
                        </form>
                        {currentCommandId}
                    </span>
                ) : null}
                {currentCommandId === ""? (
                    <div className="CommandPlaceholder">
                        Пожалуйста, выберите команду
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default memo(Commands)
