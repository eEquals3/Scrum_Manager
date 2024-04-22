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

    const submitProfile = async (values: { user_name?: string | null, icon_url?: string | null }) => {
        const a = await updateProfile(userInfo, {
            displayName: values.user_name,
            photoURL: values.icon_url
        })
        if (values) {
            updateProfile(userInfo, {
                displayName: values.user_name,
                photoURL: values.icon_url
            }).then((r) => {
                console.log("profile successfully changed", r);
                setLoginChange("none");
            }).catch((e) => {
                console.log("errors", e?.message)
            })
        }
    }

    const submitPassword = useCallback((values: { password: string }) => {
        updatePassword(userInfo, values.password).then((r) => {
            console.log("password successfully changed", r);
            setLoginChange("none");
        }).catch((e) => {
            console.log("errors", e?.message)
        })
    }, [userInfo])


    return (
        <div>
            <div>
                <span>{`Добро пожаловать ${userInfo?.displayName}`}</span>
                <span>
                    <span>Имя: {userInfo?.displayName}</span>
                    <span>Email: {userInfo?.email}</span>
                    <span>URL фото: {userInfo?.icon_url}</span>
                    <button onClick={onPressChangeProfile}> редактировать профиль </button>
                    <button onClick={onPressChangePassword}> изменить пароль </button>
                </span>

                {loginChange === "profile" ? (
                    <>
                        <form onSubmit={handleProfileSubmit(submitProfile)}>
                            <InputField register={registerProfile} error={profileErrors.user_name} type="text"
                                        placeholder=" Введите ваше имя..." name="user_name" label="Имя"/>
                            <InputField register={registerProfile} error={profileErrors.icon_url} type="text"
                                        placeholder=" Ссылка на фото..." name="icon_url" label="URL фото"/>
                            <SubmitButton label="Обновить профиль"/>
                        </form>
                    </>
                ) : null
                }
                {loginChange === "password" &&
                <form onSubmit={handleNewPasswordSubmit(submitPassword)}>
                    <InputField register={registerNewPassword} error={newPasswordErrors.password} type="password"
                                placeholder=" Введите пароль..." name="password" label="Пароль"/>
                    <InputField register={registerNewPassword} error={newPasswordErrors.confirm_password}
                                type="password" placeholder=" Подтвердите пароль..." name="confirm_password"
                                label="Подтвердите пароль"/>
                    <SubmitButton label="Обновить пароль"/>
                </form>
                }

            </div>
        </div>
    )
}
export default memo(Profile);
