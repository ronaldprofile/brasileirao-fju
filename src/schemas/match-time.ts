import { z } from 'zod'

export const createConfrontationDateSchema = z.object({
  hour: z
    .string()
    .min(2, { message: 'Preencha o campo com 2 dígitos' })
    .max(2)
    .nonempty('Preencha esse campo')
    .transform((str) => Number(str)),
  minute: z
    .string()
    .min(2, { message: 'Preencha o campo com 2 dígitos' })
    .max(2)
    .nonempty()
    .transform((str) => Number(str)),
})

export type createConfrontationDateFormData = z.infer<
  typeof createConfrontationDateSchema
>
export type createConfrontationDateFormDataInputs =
  createConfrontationDateFormData
