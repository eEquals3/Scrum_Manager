import "./InputField.css"

interface Props{
    label:string,
    type: string,
    name: string,
    placeholder: string,
    register:any,
    error: undefined | object
}

const InputField = ({label, type, name, placeholder, register, error}:Props) => {
  return(
      <>
      <div>
          <label>{label}</label>
          <input {...register(name, {required: 'error message'})} type={type} name={name} placeholder={placeholder} id={`field_${name}`}/>
      </div>
    {
        error&& <var>{error?.message}</var>
    }
    </>
  )
}

export default InputField;
