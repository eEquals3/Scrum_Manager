"use client"
import "./login-page.css"
import {REGISTER_ROUTE} from "../constants/routes";
import Link from "next/link";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../validationSchema/auth";

const Login = () => {
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema),
    })

    const submitForm = (values:object) => {
        console.log("form values", values);
    }

    return (
        <div>
            <div>
                <span>Вход в аккаунт</span>
                <form onSubmit={handleSubmit(submitForm)}>
                    <InputField register={register} error={errors.email} type="text" placeholder=" Введите email..."
                                name="email" label="Email"/>
                    <InputField register={register} error={errors.password} type="password" placeholder=" Введите пароль..." name="password"
                                label="Пароль"/>
                    <SubmitButton label="Войти"/>
                    <>
                        <span>Нет аккаунта? </span>
                        <Link href={REGISTER_ROUTE}>
                            <span>Зарегестрироваться</span>
                        </Link>
                    </>
                </form>
            </div>
        </div>
    )
}
export default Login;
