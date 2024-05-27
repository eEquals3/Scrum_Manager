import {useDroppable} from '@dnd-kit/core';
import "../app/home/sprints/sprints.css"

export function DroppableList(props: any) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref = {setNodeRef} style = {style} className="TaskList">
        {props.children}
        </div>
    )
}
