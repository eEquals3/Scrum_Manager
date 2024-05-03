import "./CommandButton.css"
import {memo, useCallback} from "react";

interface Props {
    CommandId: string
    CommandName: string,
    onTaskClickFunc: (commandId: string) => void
}

const CommandButton = (command: Props) => {

    const onTaskClick = useCallback(() => {
        command.onTaskClickFunc(command.CommandId)
    }, [command])

    return (
        <button className="CommandButton" key={command.CommandId} onClick={onTaskClick}>
            {command.CommandName}
        </button>
    )
}

export default memo(CommandButton);
