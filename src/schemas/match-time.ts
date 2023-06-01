import { z } from 'zod'

export const createConfrontationDateSchema = z.object({
  hour: z
    .string()
    .min(2, { message: 'Preencha o campo com 2 dígitos' })
    .max(2, { message: 'Preencha o campo com 2 dígitos' })
    .nonempty('Preencha esse campo')
    .regex(/^\d{2}$/, {
      message: 'A hora deve ser um valor numérico de dois dígitos',
    })
    .refine(
      (value) => {
        const hour = Number(value)
        return hour >= 0 && hour <= 23
      },
      { message: 'A hora deve estar entre 0 e 23' },
    ),

  minute: z
    .string()
    .min(2, { message: 'Preencha o campo com 2 dígitos' })
    .max(2, { message: 'Preencha o campo com 2 dígitos' })
    .nonempty()
    .regex(/^\d{2}$/, {
      message: 'Os minutos devem ser um valor numérico de dois dígitos',
    })
    .refine(
      (value) => {
        const minute = Number(value)
        return minute >= 0 && minute <= 59
      },
      { message: 'Os minutos devem estar entre 0 e 59' },
    ),
})

export type createConfrontationDateFormData = z.infer<
  typeof createConfrontationDateSchema
>
export type createConfrontationDateFormDataInputs =
  createConfrontationDateFormData
