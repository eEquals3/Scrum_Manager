import * as Yup from 'yup';

const basicLoginField = {
    email: Yup.string()
        .email("пожалуйста введите свой email")
        .required("пожалуйста заполните это поле"),
    password: Yup.string()
        .required("пожалуйста заполните это поле")
        .min(6, "пожалуста введите пароль")
}

export const loginSchema = Yup.object({
    ...basicLoginField
});


export const registerSchema = Yup.object({
    ...basicLoginField,
    confirm_password: Yup.string()
        .oneOf([Yup.ref<string>('password')], 'Пароль должен совпадать')
});

export const profileSchema = Yup.object({
    ...basicLoginField,
    confirm_password: Yup.string()
        .oneOf([Yup.ref<string>('password')], 'Пароль должен совпадать'),
    user_name: Yup.string()
        .required("пожалуйста заполните это поле")
});
