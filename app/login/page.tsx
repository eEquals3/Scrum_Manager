import "./login-page.css"
import {REGISTER_ROUTE} from "../constants/routes";
import Link from "next/link";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const login = () => {
    return (
        <div>
            <div>
                <span>Введите ваш адрес электронной почты</span>
                <text>
                    <InputField type="text" placeholder=" Введите email..." name="email" label="Email"/>
                    <InputField type="password" placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <SubmitButton label="подтвердить"/>
                    <>
                        <span>Нет аккаунта? </span>
                        <Link href={REGISTER_ROUTE}>
                            <span>Зарегестрироваться</span>
                        </Link>
                    </>
                </text>
            </div>
        </div>
    )
}
export default login;
