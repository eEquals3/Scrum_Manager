import "./SubmitButton.css"

interface Props{
    label: string;
    onClickFunk?: () => {};
}

const SubmitButton = ({label, onClickFunk}:Props) => {
    return (
        <div>
            <button onClick={onClickFunk}>
                {label}
            </button>
        </div>
    )
}

export default SubmitButton;
