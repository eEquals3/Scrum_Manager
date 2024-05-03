import Image from 'next/image';
import penIcon from "../../../public/icons/pen/pencil-edit-button-svgrepo-com.svg";
import React, {memo, useCallback} from "react";
import "./PenIcon.css"

interface Props {
    onClickState: string
    onClickFunk: (state:string) => void
}

const PenIcon = (props: Props) => {

    const onIconClick = useCallback(()=>{
        props.onClickFunk(props.onClickState)
    },[props])

    return (
        <div className="PenIcon">
            <Image
                onClick={onIconClick}
                src={penIcon}
                alt="Редактировать"
                width={30}
                height={30}
            />
        </div>
    )
}

export default memo(PenIcon)
