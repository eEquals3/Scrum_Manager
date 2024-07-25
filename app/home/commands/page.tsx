"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./commands.css"
import {
    collection,
    doc,
    DocumentData,
    limit,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where
} from "firebase/firestore";
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
import SprintsChartAndStats from "../../../components/SprintsChart";
import BurnDownChartAndStats from "../../../components/BurnDownChart";


const Commands = () => {
    const {user}: any = AuthContext();
    const userInfo = user.user;

    const [currentCommandId, setCurrentCommand] = useState<string>("")
    const [commands, setCommands] = useState<DocumentData[]>([])
    const [commandState, setCommandState] = useState<string>("display")
    const [lastSprints, setLastSprints] = useState<DocumentData[]>([])
    const [currentSprint, setCurrentSprint] = useState<DocumentData>({})
    const [currentSprintScore, setCurrentSprintScore] = useState<number>(0)

    const {register, getValues, formState: {errors}, resetField, trigger} = useForm({
        resolver: yupResolver(commandNameSchema),
    })

    const sprintsQuery = useMemo(() => {
        return query(collection(db, "users", userInfo?.uid, "sprints"), where("commandId", "==", currentCommandId), orderBy("number", "desc"), limit(5));
    }, [currentCommandId, userInfo?.uid])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users", userInfo?.uid, "commands"), (snapshot => {
            const updatedTasks = snapshot.docs.map((doc) => doc.data())
            setCommands(updatedTasks);
        }))
        return () => unsubscribe();
    }, [userInfo?.uid])

    useEffect(() => {
        const unsubscribe = onSnapshot(sprintsQuery, (snapshot => {
            const updatedSprints = snapshot.docs.map((doc) => doc.data())
            setLastSprints(updatedSprints);
            setCurrentSprint(updatedSprints[0])
        }))
        return () => unsubscribe();
    }, [sprintsQuery])

    useEffect(() => {
        resetField("name")
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
                <h1>
                    {currentCommand && commandState === "display" ?
                        <>
                            <div className="Hollow"/>
                            <div className="Header">
                                <div
                                    className="CommandName">{`${currentCommand?.name}`}</div>
                                <PenIcon onClickFunk={setCommandState} onClickState="redact"/>
                            </div>
                        </> : null}
                    {commandState === "redact" ?
                        (<>
                            <div className="Hollow"/>
                            <div className="Header">
                                <div>
                                    <InputField name="name" type="text" placeholder={""} label=""
                                                register={register} defaultValue={currentCommand?.name}
                                                error={errors.name}/>
                                </div>
                                <SaveIcon onClickFunk={onSaveClick}/>
                            </div>
                        </>) : null}
                    {commandState === "display" ?
                        <>
                            {!currentCommand ? (
                                <>
                                    <div className="Hollow"/>
                                    <div className="Header">
                                        <div
                                            className="CommandName">{"Команды"}
                                        </div>
                                    </div>
                                </>) : null}
                            <div className="ButtonContainer">
                                <a>
                                    список команд
                                    <div>
                                        {commands.map(renderCommand)}
                                        <button onClick={onAddCommandClick}> +</button>
                                    </div>
                                </a>
                            </div>
                        </> : null}
                </h1>
                {currentCommandId != "" ? (
                    <span>
                        {currentCommandId ?
                            <div className="CommandBody">
                                {currentSprint ? (<>
                                        <BurnDownChartAndStats lastSprints={lastSprints} currentSprint={currentSprint}
                                                               userID={userInfo.uid}
                                                               setScoreFunc={setCurrentSprintScore}/>
                                        <SprintsChartAndStats lastSprints={lastSprints} currentSprint={currentSprint}
                                                              currentSprintScore={currentSprintScore}/>
                                    </>
                                ) : <div className="NoCurrentSprint"> {"У этой команды нет спринтов"} </div>}
                            </div>
                            : null}
                    </span>
                ) : null}
                {currentCommandId === "" ? (
                    <div className="CommandPlaceholder">
                        Пожалуйста, выберите команду
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default memo(Commands)
