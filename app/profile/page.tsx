"use client"
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "../login/login-page.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {profileSchema, registerSchema} from "../validationSchema/auth";

const Profile = () => {
    const name:string = "User";

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(profileSchema),
    })

    const onSubmit = (data:object) => console.log(data)

    return (
        <div>
            <div>
                <span>{`Добро пожаловать ${name}`}</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField register={register} error={errors.user_name} type="text" placeholder=" Введите ваше имя..." name="user_name" label="Имя"/>
                    <InputField register={register} error={errors.email} type="text" placeholder=" Введите email..." name="email" label="Email"/>
                    <InputField register={register} error={errors.password} type="password" placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <InputField register={register} error={errors.confirm_password} type="password" placeholder=" Подтвердите пароль..." name="confirm_password" label="Подтвердите Пароль"/>
                    <SubmitButton label="Обновить"/>
                </form>
            </div>
        </div>
    )
}
export default Profile;
