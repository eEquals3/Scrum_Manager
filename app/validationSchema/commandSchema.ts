import * as Yup from 'yup'

export const commandNameSchema = Yup.object({
    name: Yup.string().min(3, "название команды слишком короткое"). max(80, "название команды слишком длинное"),
})
