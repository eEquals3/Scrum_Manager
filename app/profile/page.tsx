import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "../login/login-page.css";

const Profile = () => {
    const name:string = "User";

    return (
        <div>
            <div>
                <span>{`Добро пожаловать ${name}`}</span>
                <text>
                    <InputField type="text" placeholder=" Введите ваше имя..." name="user_name" label="Имя"/>
                    <InputField type="text" placeholder=" Введите email..." name="email" label="Email"/>
                    <InputField type="password" placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <InputField type="password" placeholder=" Подтвердите пароль..." name="confirm_password" label="Подтвердите Пароль"/>
                    <SubmitButton label="Обновить"/>
                </text>
            </div>
        </div>
    )
}
export default Profile;
