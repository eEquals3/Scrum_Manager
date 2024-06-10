"use client"
import "./ResultGrid.css"
import React, {memo, useCallback} from "react";
import {DocumentData} from "firebase/firestore";

interface Props {
    surveyResults: { userId: string, name: string, userScore: { id: string, score: number }[] }[] | DocumentData[],
    surveySelectedTasks: { id: string, name: string }[] | DocumentData[]
}

const ResultGrid = (props: Props) => {

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

    const renderThing = useCallback((thingName: string | number, thingId: string, score: boolean) => {
        return <div className="GridCell" key={`${thingName}_${thingId}`}
                    style={score ? {color: checkColor(Number(thingName))} : {background: "none"}}> {thingName} </div>
    }, [])

    const renderUser = useCallback((userAnswers: any) => {
        console.log('userAnswers', JSON.stringify(userAnswers, null, 2));
        return <div className="gridRow">
            <div className="RowHeaderCell"
                 key={`${userAnswers.userAnswers.name}_${userAnswers.userAnswers.id}`}> {userAnswers.userAnswers.name} </div>
            {userAnswers.userAnswers.userScore.map((answer: {score: number, id: string}) => renderThing(answer.score, answer.id, true))}
        </div>
    }, [renderThing])

    return <div className="ResultGridContainer">
        <div className="UserCount"> {`Всего проголосовало: ${props.surveyResults.length} пользователей`}</div>
        <div className="Grid">
            <div className="GridColumn">
                <div className="gridRow">
                    <div className="Hollow"/>
                    {props.surveySelectedTasks.map(task => renderThing(task.name, task.id, false))}
                </div>
                {props.surveyResults.map(renderUser)}
            </div>
        </div>

    </div>
}

export default memo(ResultGrid)
