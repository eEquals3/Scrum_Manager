import "./InputField.css"

interface Props{
    label:string,
    type: string,
    name: string,
    placeholder: string,
}

const InputField = ({label, type, name, placeholder}:Props) => {
  return(
      <div>
          <label>{label}</label>
          <input type={type} name={name} placeholder={placeholder} id={`field_${name}`}/>
      </div>
  )
}

export default InputField;
