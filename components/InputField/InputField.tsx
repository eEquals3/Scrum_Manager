import "./InputField.css"

interface Props{
    label:string,
    type: string,
    name: string,
    placeholder: string,
    register:any,
    error?: any
    defaultValue?:string
}

const InputField = ({label, type, name, placeholder, register, error, defaultValue}:Props) => {
  return(
      <>
      <b>
          <label>{label}</label>
          <input {...register(name, {required: 'error message'})} type={type} name={name} placeholder={placeholder} id={`field_${name}`} defaultValue={defaultValue}/>
      </b>
    {
        error&& <var>{error?.message}</var>
    }
    </>
  )
}

export default InputField;
