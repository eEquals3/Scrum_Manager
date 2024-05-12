"use client"
import "../login/login-page.css";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Link from "next/link";
import {HOME_ROUTE, LOGIN_ROUTE} from "../constants/routes";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../validationSchema/auth";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth, db} from "../services/Firebase";
import {useRouter} from "next/navigation";
import {memo, useCallback} from "react";
import {collection, doc, DocumentData, setDoc} from "firebase/firestore";

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
        createUserWithEmailAndPassword(auth, userData.email, userData.password).then(async (response) => {
            alert("Регистрация прошла успешно");
            const userid = response.user.uid;
            const taskid = crypto.randomUUID()
            setTimeout(() => {
                router.push(LOGIN_ROUTE);
            }, 100);
            reset();
            try {
                await setDoc(doc(db, "users", userid), {
                    email: userData.email,
                    name: "",
                    iconURL: "",
                    lastSprint: 1,
                } as DocumentData);
            } catch (errors) {
                console.log('errors adding document', JSON.stringify(errors, null, 2));
            }
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
