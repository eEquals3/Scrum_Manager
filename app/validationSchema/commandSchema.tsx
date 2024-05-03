import * as Yup from 'yup'

export const commandNameSchema = Yup.object({
    name: Yup.string().min(3, "название команды должно быть длиннее 3 символов"),
})
