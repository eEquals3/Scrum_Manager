import * as Yup from 'yup';

export const taskSchema = Yup.object({
    name: Yup.string().min(3, "название задачи должно быть длиннее 3 символов"),
    description: Yup.string().nullable()
})
