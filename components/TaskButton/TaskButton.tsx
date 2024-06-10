import "./TaskButton.css"
import React, {memo, useCallback} from "react";

interface Props {
    taskId: string
    taskName: string,
    onTaskClickFunc?: (taskId: string) => void
    onTaskDisplayFunc?: (state: string) => void
    score?: number
    grab?: boolean
}

const TaskButton = (task: Props) => {

    console.log('task.grab', JSON.stringify(task.grab, null, 2));

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

    const onTaskClick = useCallback(() => {
        if (task.onTaskClickFunc) {
            task.onTaskClickFunc(task.taskId)
        }
        if (task.onTaskDisplayFunc) {
            task.onTaskDisplayFunc("display")
        }
    }, [task])

    return (
        <button className="TaskButton" style={(task.grab!= undefined? {cursor: "grabbing"} : {cursor: "pointer"})} key={task.taskId} onClick={onTaskClick}>
            {task.taskName}
            <div className="Score"
                 style={task.score?{background: checkColor(task.score), color: "var(--main-text-color)"} :undefined}> {task.score ? "Сложность: " + task.score : "Сложность неизвестна"} </div>
        </button>
    )
}

export default memo(TaskButton);
