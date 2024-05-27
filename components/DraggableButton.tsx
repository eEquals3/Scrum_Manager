import {useDraggable} from '@dnd-kit/core';
import "../components/TaskButton/TaskButton.css"

export function DraggableButton(props: any) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <button className="TaskButton" key={props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.name}
            {props.score? <div className="Score"> {"Сложность: " + props.score} </div> : null}
            {props.children}
        </button>
    );
}
