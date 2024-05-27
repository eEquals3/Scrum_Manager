import "./InputField.css"

interface Props{
    label:string,
    type?: string,
    name: string,
    placeholder: string,
    register:any,
    error?: any
    defaultValue?:string
    focus?: boolean
}

export const InputField = ({label, type, name, placeholder, register, error, defaultValue, focus}:Props) => {
  return(
      <>
      <b>
          <label>{label}</label>
          <input {...register(name, {required: 'error message'})} autoFocus={focus || false} type={type} name={name} placeholder={placeholder} id={`field_${name}`} defaultValue={defaultValue}/>
      </b>
    {
        error&& <var>{error?.message}</var>
    }
    </>
  )
}

export const InputArea = ({label, name, placeholder, register, error, defaultValue}:Props) => {
    return(
        <>
            <b>
                <label>{label}</label>
                <textarea {...register(name, {required: 'error message'})} name={name} placeholder={placeholder} id={`field_${name}`} defaultValue={defaultValue}/>
            </b>
            {
                error&& <var>{error?.message}</var>
            }
        </>
    )
}

export default InputField;
