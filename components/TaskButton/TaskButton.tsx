import "./TaskButton.css"
import React, {memo, useCallback} from "react";

interface Props {
    taskId: string
    taskName: string,
    onTaskClickFunc?: (taskId: string) => void
    score: number
}

const TaskButton = (task: Props) => {

    const onTaskClick = useCallback(() => {
        if (task.onTaskClickFunc) {
            task.onTaskClickFunc(task.taskId)
        }
    }, [task])

    return (
        <button className="TaskButton" key={task.taskId} onClick={onTaskClick}>
            {task.taskName}
            {task.score ? <div className="Score"> {"Сложность: " + task.score} </div> : null}
        </button>
    )
}

export default memo(TaskButton);
