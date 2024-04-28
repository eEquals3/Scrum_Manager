import "./TaskButton.css"
import {memo, useCallback} from "react";

interface Props {
    taskId: string
    taskName: string,
    taskDescription: string,
    onTaskClickFunc: (taskId: string) => void
}

const TaskButton = (task: Props) => {

    const onTaskClick = useCallback(() => {
        task.onTaskClickFunc(task.taskId)
    }, [task])

    return (
        <button className="TaskButton" key={task.taskId} onClick={onTaskClick}>
            {task.taskName}
        </button>
    )
}

export default memo(TaskButton);
