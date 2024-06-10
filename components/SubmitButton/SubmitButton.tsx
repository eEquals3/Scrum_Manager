import "./SubmitButton.css"

interface Props{
    label: string;
    onClickFunk?: () => void | any;
    disabled?: boolean
}

const SubmitButton = ({label, onClickFunk, disabled}:Props) => {
    return (
        <a>
            <button onClick={onClickFunk} disabled={disabled}>
                {label}
            </button>
        </a>
    )
}

export default SubmitButton;
