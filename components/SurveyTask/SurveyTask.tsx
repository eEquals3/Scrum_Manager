"use client"
import "./SurveyTask.css"
import {memo, useCallback, useEffect, useState} from "react";

interface Props {
    taskID: string
    taskName: string,
    taskDesc: string,
    taskFunc: ({taskID, score}: { taskID: string, score: number }) => void
    num: number
}

const SurveyTask = (props: Props) => {

    const [score, setScore] = useState<number>(1)
    const scoreList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(() => {
        console.log('score', JSON.stringify(score, null, 2));
    }, [score]);

    const onSelectScore = useCallback((num: number) => {
        setScore(num)
        props.taskFunc({taskID: props.taskID, score: num})
    }, [props])

    const createRadioButton = useCallback((num: number) => {
        return (
            <div key={`${props.taskID}_${num}_RadioButton`} className="RadioButton">
                <input key={`${props.taskID}_${num}`} type="radio" id={`${props.taskID}_${num}`}
                       onChange={() => onSelectScore(num)} value={num} name={`${props.taskID}score`}
                       defaultChecked={num === score}/>
                <label htmlFor={`${props.taskID}_${num}`}> {num} </label>
            </div>)
    }, [props.taskID, onSelectScore, score])

    return (
        // @ts-ignore
        <div className="TaskBody" style={{'--n': `${props.num}s`}}>
            <div key={`${props.taskID}_Header`} className="TaskHeader">
                {`Задача «${props.taskName}»`}
            </div>
            <div key={`${props.taskID}_Desc`} className="TaskDesc">
                {props.taskDesc ? props.taskDesc : "нет подробного описания"}
            </div>
            <legend className="RadioButtonContainer">
                {scoreList.map(createRadioButton)}
            </legend>
        </div>
    )
}

export default memo(SurveyTask)
