"use client"
import "./login-page.css"
import {HOME_ROUTE, REGISTER_ROUTE} from "../constants/routes";
import Link from "next/link";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../validationSchema/auth";
import {auth} from "../services/Firebase.js"
import {signInWithEmailAndPassword} from "@firebase/auth";
import {useRouter} from "next/navigation";

interface UserLogin {
    email: string,
    password: string
}

const Login = () => {
    const {handleSubmit, register, formState: {errors}, reset} = useForm({
        resolver: yupResolver(loginSchema),
    })

    const router = useRouter();

    const onSubmit = (userData: UserLogin) => {
        console.log(userData);
        signInWithEmailAndPassword(auth, userData.email, userData.password).then((response)=>{
            reset();
            router.push(HOME_ROUTE);
        }).catch((errors)=>{
            alert ("что-то пошло не так")
        })
    }

    return (
        <div>
            <div>
                <span>Вход в аккаунт</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField register={register} error={errors.email} type="text" placeholder=" Введите email..."
                                name="email" label="Email"/>
                    <InputField register={register} error={errors.password} type="password"
                                placeholder=" Введите пароль..." name="password"
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
