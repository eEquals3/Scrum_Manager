"use client"
import "../login/login-page.css";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Link from "next/link";
import {LOGIN_ROUTE} from "../constants/routes";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../validationSchema/auth";


const Register = () => {

    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema),
    })

    const submitForm = (values: object) => {
        console.log("form values", values);
    }
    return (
        <div>
            <div>
                <span>Регистрация</span>
                <form onSubmit={handleSubmit(submitForm)}>
                    <InputField register={register} error={errors.email} type="text" placeholder=" Введите email..."
                                name="email" label="Email"/>
                    <InputField register={register} error={errors.password} type="password"
                                placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <InputField register={register} error={errors.confirm_password} type="password"
                                placeholder=" Подтвердите пароль..." name="confirm_password"
                                label="Подтвердите Пароль"/>
                    <SubmitButton label="Зарегестрироваться"/>
                    <>
                        <span>Уже есть аккаунт? </span>
                        <Link href={LOGIN_ROUTE}>
                            <span>Войти</span>
                        </Link>
                    </>
                </form>
            </div>
        </div>
    )
}
export default Register;
