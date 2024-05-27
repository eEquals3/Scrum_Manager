import Image from 'next/image';
import saveIcon from "./save-item-1411-svgrepo-com.svg";
import React, {memo, useCallback} from "react";
import "./SaveIcon.css"

interface Props {
    onClickFunk: () => any
}

const SaveIcon = (props: Props) => {

    const onIconClick = useCallback(()=>{
        props.onClickFunk()
    },[props])

    return (
        <div className="SaveIcon">
            <Image
                onClick={onIconClick}
                src={saveIcon}
                alt="Редактировать"
                width={30}
                height={30}
            />
        </div>
    )
}

export default memo(SaveIcon)
