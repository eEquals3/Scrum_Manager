import * as Yup from 'yup';

export const taskSchema = Yup.object({
    name: Yup.string().min(3, "Введите название задачи"),
    description: Yup.string().nullable()
})
