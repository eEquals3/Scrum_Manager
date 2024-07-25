"use client"
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import "./Surveys.css"
import {
    arrayUnion,
    collection,
    doc,
    DocumentData,
    getDoc,
    limit,
    onSnapshot,
    orderBy,
    query,
    where
} from "firebase/firestore";
import {db} from "../../services/Firebase";
import {surveyNameSchema} from "../../validationSchema/SurveyTasks"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import InputField from "../../../components/InputField/InputField";
import SurveyTask from "../../../components/SurveyTask/SurveyTask";
import {usePathname} from "next/navigation";
import {updateDoc} from "@firebase/firestore";
import Modal from "../../../components/Modal/Modal";

interface TaskScore {
    taskID: string,
    score: number
}

interface SurveyType{
    completed: boolean,
    selectedTasks: {id: string, name: string, description: string}[],
    userScore: {userId: string, name: string, userScore:{id: string, score: number}[]}[]
}

const Page = () => {
    const userID = usePathname().substring(9, 37);
    const [survey, setSurvey] = useState<SurveyType | DocumentData>({completed: false, userScore: [], selectedTasks: []})
    const [authorName, setAuthorName] = useState<string>("userName")
    const [commandMemberName, setCommandMemberName] = useState<string>("")
    const [tasks, setTasks] = useState<DocumentData[]>([])
    const [surveyClosed, setSurveyClosed] = useState<boolean>(false)
    const [modalEndSurveyVisibility, setModalEndSurveyVisibility] = useState<boolean>(false)
    const [modalOnCompleteSurveyVisibility, setModalOnCompleteSurveyVisibility] = useState<boolean>(false)
    const [confirmUnactive, setConfirmUnactive] = useState<boolean>(false)
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(surveyNameSchema),
    })
    const [taskScore, setTaskScore] = useState<TaskScore>()

    const surveyQuery = useMemo(() => {
        return query(collection(db, "users", userID, "survey"), limit(1));
    }, [userID])

    useEffect(()=>{
        getDoc(doc(db, "users", userID)).then(r=>{
            // @ts-ignore
            setAuthorName(r?.data().name? r.data().name : "?")
        })
        console.log('запрос имени прошел');
    },[])

    useEffect(() => {
        console.log('commandMemberName', JSON.stringify(commandMemberName, null, 2));
    }, [commandMemberName]);

    useEffect(() => {
        console.log('tasks', JSON.stringify(tasks, null, 2));
    }, [tasks]);

    useEffect(() => {
        console.log('taskScore', JSON.stringify(taskScore, null, 2));
    }, [taskScore]);

    useEffect(() => {
        const unsubscribe = onSnapshot(surveyQuery, (snapshot => {
            const updatedSurvey = snapshot.docs[0].data()
            setSurvey(updatedSurvey)
            setModalEndSurveyVisibility(updatedSurvey.completed);
            setSurveyClosed(updatedSurvey.completed);
            //setTasks(updatedSurvey.selectedTasks)
            //console.log('tasks', JSON.stringify(tasks, null, 2));
            if (tasks.length === 0){ setTasks(updatedSurvey.selectedTasks) }
        }))
        return () => unsubscribe();
    }, [surveyQuery])

    useEffect(() => {
        if (taskScore === undefined) {
            const tasksArray: DocumentData[] = tasks.map((task) => (
                {...task, score: 1}
            ))
            setTasks(tasksArray)
        } else {
            const arrayWithChangedTask: DocumentData[] = tasks.map((task) =>
                task.id === taskScore?.taskID ?
                    {...task, score: taskScore?.score} : task
            )
            setTasks(arrayWithChangedTask)
        }
    }, [taskScore])

//    useEffect(() => {
//        getDoc(doc(db, "users", userID, "survey", "survey")).then((r) => {
//           setModalVisibility(r.data().completed);
//            setSurveyClosed(r.data().completed);
//            setTasks(r.data().selectedTasks)
//        })
//    }, [])

    const onSubmitName = useCallback((values: { name: string }) => {
        setCommandMemberName(values.name)
    }, [])

    const createSurveyTask = useCallback((task: DocumentData, i: number) => {
        return <SurveyTask key={task.id} taskName={task.name} taskDesc={task.description} taskID={task.id}
                           taskFunc={setTaskScore} num={i}/>
    }, [])

    const onSaveResultClick = useCallback(async () => {
        if (commandMemberName != "") {

            const userAnswers = {userId: crypto.randomUUID().toString(), name: commandMemberName, userScore: tasks.map((task) => (
                    {id: task.id, score: task.score || 1}
                )) }

            const mappedTaskObj = survey.userScore
            mappedTaskObj.push({userAnswers})

            console.log(commandMemberName)
            console.log(mappedTaskObj)
            await updateDoc(doc(db, "users", userID, "survey", "survey"), {
                userScore: mappedTaskObj
            } as DocumentData)
            setModalOnCompleteSurveyVisibility(true)
        } else {
            alert("Пожалуйста, укажите ваше имя")
        }
        commandMemberName ? setConfirmUnactive(true) : null
    }, [commandMemberName, survey.userScore, tasks, userID])

    return (
        <div className="SurveysBody">
            {!surveyClosed ? (
                <>
                    <header className="SurveyHeader">
                        {(authorName!="userName"?`Автор опроса - ${authorName}`: "Автор не указал свое имя")}
                        <form className="NameInputContainer" onSubmit={handleSubmit(onSubmitName)}>
                            <InputField register={register} error={errors.name} type="name"
                                        placeholder=" Ведите свое имя... " name="name" label=""/>
                            <SubmitButton label={"Подтвердить"}/>
                        </form>
                        {(commandMemberName? `${commandMemberName}, пожалуйста` : `Пожалуйста`) + `, оцените сложность каждой задачи по шкале от 1 до 10`}
                    </header>
                    <div className="SurveyTaskPart">
                        {tasks.map(createSurveyTask)}
                    </div>
                    <footer className="SurveyFooter">
                        <SubmitButton label={"Сохранить"} onClickFunk={onSaveResultClick} disabled={confirmUnactive}/>
                    </footer>
                </>
            ) : null}
            {modalEndSurveyVisibility ?
                <Modal modalHeader="Внимание" modalText="Опрос был закончен автором" modalButtonText="Ок"
                       closeModalFunc={setModalEndSurveyVisibility}/> : null}
            {modalOnCompleteSurveyVisibility ?
                <Modal modalHeader="Опрос пройден" modalText={`${commandMemberName}, спасибо за ваши ответы`}
                       modalButtonText="Ок" closeModalFunc={setModalOnCompleteSurveyVisibility}/> : null}
        </div>
    )
}

export default memo(Page)
