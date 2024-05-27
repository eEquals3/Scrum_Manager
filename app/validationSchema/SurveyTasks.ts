import * as Yup from 'yup';

export const surveyNameSchema = Yup.object({
    name: Yup.string().required("Пожалуйста, укажите ваше имя").min(2, "Ваше имя скорее всего длиннее одного символа").max(30, "Ваше имя скорее всего короче 30 символов")
})
