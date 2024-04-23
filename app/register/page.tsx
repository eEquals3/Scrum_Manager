"use client"
import "../login/login-page.css";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Link from "next/link";
import {LOGIN_ROUTE} from "../constants/routes";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../validationSchema/auth";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../services/Firebase";
import {useRouter} from "next/navigation";
import {memo, useCallback} from "react";

interface UserLogin {
    email: string,
    password: string
}

const Register = () => {

    const {handleSubmit, register, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerSchema),
    })

    const router = useRouter();

    const onSubmit = useCallback((userData: UserLogin) => {
        console.log(userData);
        createUserWithEmailAndPassword(auth, userData.email, userData.password).then((response) => {
            alert("Регистрация прошла успешно");
            reset();
            router.push(LOGIN_ROUTE);

        }).catch((errors) => {
            console.log("catch ", errors)
            alert("что-то пошло не так, попробуйте снова");
        });
    }, [reset, router])

    return (
        <div>
            <div>
                <span>Регистрация</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField register={register} error={errors.email} type="text" placeholder=" Введите email..."
                                name="email" label="Email"/>
                    <InputField register={register} error={errors.password} type="password"
                                placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <InputField register={register} error={errors.confirm_password} type="password"
                                placeholder=" Подтвердите пароль..." name="confirm_password"
                                label="Подтвердите Пароль"/>
                    <SubmitButton label="Зарегистрироваться"/>
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
export default memo(Register);
