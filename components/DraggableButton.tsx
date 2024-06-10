import {useDraggable} from '@dnd-kit/core';
import "../components/TaskButton/TaskButton.css"
import React from "react";

export function DraggableButton(props: any) {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

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

    return (
        <button className="TaskButton" key={props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.name}
            <div className="Score" style={(props.score?{background: checkColor(props.score), color: "var(--main-text-color)"} :undefined)}> {props.score ? "Сложность: " + props.score : "Сложность неизвестна"} </div>
            {props.children}
        </button>
    );
}
