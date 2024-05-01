import "./SubmitButton.css"

interface Props{
    label: string;
    onClickFunk?: () => void | any;
}

const SubmitButton = ({label, onClickFunk}:Props) => {
    return (
        <a>
            <button onClick={onClickFunk}>
                {label}
            </button>
        </a>
    )
}

export default SubmitButton;
