import "./SubmitButton.css"

interface Props{
    label: string;
}

const SubmitButton = ({label}:Props) => {
    return (
        <div>
            <button>
                {label}
            </button>
        </div>
    )
}

export default SubmitButton;
