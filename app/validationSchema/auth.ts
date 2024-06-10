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
    user_name: Yup.string().nullable(),
})

export const passwordSchema = Yup.object({
    password: Yup.string()
        .required("пожалуйста заполните это поле")
        .min(6, "пожалуста введите пароль"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref<string>('password')], 'Пароль должен совпадать')
})
