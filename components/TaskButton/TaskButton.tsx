import "./TaskButton.css"
import React, {memo, useCallback} from "react";

interface Props {
    taskId: string
    taskName: string,
    onTaskClickFunc?: (taskId: string) => void
    onTaskDisplayFunc?: (state: string) => void
    score?: number
    scoreColor?: string
}

const TaskButton = (task: Props) => {

    const onTaskClick = useCallback(() => {
        if (task.onTaskClickFunc) {
            task.onTaskClickFunc(task.taskId)
        }
        if (task.onTaskDisplayFunc) {
            task.onTaskDisplayFunc("display")
        }
    }, [task])

    return (
        <button className="TaskButton" key={task.taskId} onClick={onTaskClick}>
            {task.taskName}
            <div className="Score" style={{ background: task.scoreColor}}> {task.score ? "Сложность: " + task.score : "Сложность неизвестна"} </div>
        </button>
    )
}

export default memo(TaskButton);
