'use client'
import {JSX, memo, useCallback} from "react";
import "./Modal.css"

interface Props {
    modalHeader: string;
    modalText: string | any;
    modalButtonText?: string;
    closeModalFunc: (b:boolean)=> void
}

const Modal = (Prop: Props) => {

    const modalButtonClick = useCallback(()=>{
        Prop.closeModalFunc(false)
    }, [Prop])

    return (
        <div className="Background" onClick={modalButtonClick}>
            <div className="ModalBody">
                <div className="ModalHeader">{Prop.modalHeader}</div>
                <div className="ModalText">{Prop.modalText}</div>
                <button className="ModalButton" onClick={modalButtonClick}>{Prop.modalButtonText? Prop.modalButtonText : "Ок"}</button>
            </div>
        </div>
    )
}

export default memo(Modal)
