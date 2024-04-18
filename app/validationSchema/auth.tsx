import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("пожалуйста введите свой email")
        .required("пожалуйста заполните это поле"),
    password: Yup.string()
        .required("пожалуйста заполните это поле")
        .min(6, "пожалуста введите пароль")
});


export const registerSchema = Yup.object({
    email: Yup.string()
        .email("пожалуйста введите свой email")
        .required("пожалуйста заполните это поле"),
    password: Yup.string()
        .required("пожалуйста заполните это поле")
        .min(6, "пожалуста введите пароль"),
    confirm_password: Yup.string()
        .required("пожалуйста заполните это поле")
        .oneOf([Yup.ref('password')], "пароль не совпадает")
});
