"use client"
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "../login/login-page.css"
import "./pofile-page.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {passwordSchema, profileSchema} from "../validationSchema/auth";
import {memo, useCallback, useState} from "react";
import {AuthContext} from "../provider/AuthProvider";
import {updatePassword, updateProfile} from "@firebase/auth";
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "../services/Firebase";
import {DocumentData} from "firebase/firestore";

const Profile = () => {
    const {user}: any = AuthContext();
    const userInfo = user.user;

    const {handleSubmit: handleProfileSubmit, register: registerProfile, formState: {errors: profileErrors}} = useForm({
        resolver: yupResolver(profileSchema),
    })

    const {
        handleSubmit: handleNewPasswordSubmit,
        register: registerNewPassword,
        formState: {errors: newPasswordErrors}
    } = useForm({
        resolver: yupResolver(passwordSchema),
    })
    const [loginChange, setLoginChange] = useState<string>("none");

    const onPressChangeProfile = useCallback(() => {
        loginChange === "profile" ?
            setLoginChange("none") : setLoginChange("profile")
    }, [loginChange])

    const onPressChangePassword = useCallback(() => {
        loginChange === "password" ?
            setLoginChange("none") : setLoginChange("password")
    }, [loginChange])

    const onSubmitProfile = useCallback((values: { user_name?: string | null, icon_url?: string | null }) => {
        if (values) {
            updateProfile(userInfo, {
                displayName: values.user_name,
            }).then(async (r) => {
                try {
                    await updateDoc(doc(db, "users", userInfo.uid), {
                        name: values.user_name,
                    } as DocumentData)
                } catch (errors) {
                    console.log('errors', JSON.stringify(errors, null, 2));
                    console.log('userInfo.uid', JSON.stringify(userInfo.uid, null, 2));
                }
                console.log("profile successfully changed", r);
                setLoginChange("none");
            }).catch((e) => {
                alert("что-то пошло не так")
                console.log("errors", e?.message)
            })
        }
    }, [userInfo])

    const onSubmitPassword = useCallback((values: { password: string }) => {
        updatePassword(userInfo, values.password).then((r) => {
            console.log("password successfully changed", r);
            setLoginChange("none");
            alert("Пароль успешно иземенен")
        }).catch((e) => {
            console.log("errors", e?.message)
        })
    }, [userInfo])


    return (
        <div>
            <div>
                <span>{`Добро пожаловать, ${userInfo?.displayName}`}</span>
                <span>
                    <span>Имя: {userInfo?.displayName}</span>
                    <span>Email: {userInfo?.email}</span>
                    <div className="ButtonContainer">
                        <SubmitButton label={"редактировать профиль"} onClickFunk={onPressChangeProfile}/>
                    <SubmitButton label={"редактировать имя"} onClickFunk={onPressChangePassword}/>
                    </div>
                </span>

                {loginChange === "profile" ? (
                    <>
                        <form onSubmit={handleProfileSubmit(onSubmitProfile)}>
                            <InputField register={registerProfile} error={profileErrors.user_name} type="text"
                                        placeholder=" Введите ваше имя..." name="user_name" label="Имя"/>
                            <SubmitButton label="Подтвердить"/>
                        </form>
                    </>
                ) : null
                }
                {loginChange === "password" ? (
                    <form onSubmit={handleNewPasswordSubmit(onSubmitPassword)}>
                        <InputField register={registerNewPassword} error={newPasswordErrors.password} type="password"
                                    placeholder=" Введите пароль..." name="password" label="Пароль"/>
                        <InputField register={registerNewPassword} error={newPasswordErrors.confirm_password}
                                    type="password" placeholder=" Подтвердите пароль..." name="confirm_password"
                                    label="Подтвердите пароль"/>
                        <SubmitButton label="Обновить пароль"/>
                    </form>
                ) : null
                }
            </div>
        </div>
    )
}
export default memo(Profile);
