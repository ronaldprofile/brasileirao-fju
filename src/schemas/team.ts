import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5mb
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const createTeamFormSchema = z.object({
  name: z.string().nonempty('Nome do time é obrigatório'),
  teamColorHighlight: z.string().nonempty('Cor de destaque é obrigatório'),
  playersIds: z
    .array(z.string(), {
      invalid_type_error: 'Minimo 5 jogadores',
    })
    .min(1, 'Minimo 5 jogadores')
    .max(10, 'Máximo 5 jogadores'),
  shield: z
    .any()
    .refine((files) => !!files.item(0), 'A logo do time é obrigatória')
    .refine(
      (files) => files.item(0)?.size <= MAX_FILE_SIZE,
      'Arquivo deve ter no máximo de 5MB',
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files.item(0)?.type),
      'Formato de imagem inválido',
    )
    .transform((files) => {
      return files.item(0)
    }),
})

export type createTeamFormData = z.infer<typeof createTeamFormSchema>
export type createTeamFormDataInputs = createTeamFormData
