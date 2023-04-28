import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5mb
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const createPlayerFormSchema = z.object({
  name: z
    .string()
    .nonempty('Nome é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
  surname: z.string().nonempty('Apelido é obrigatório'),
  shirt: z.string().nonempty('Número da camisa é obrigatório'),
  // avatar: z
  //   .instanceof(FileList)
  //   // .any()
  //   .refine((files) => !!files.item(0), 'A imagem de perfil é obrigatória')
  //   .refine(
  //     (files) => files.item(0)!.size <= MAX_FILE_SIZE,
  //     'Arquivo deve ter no máximo de 5MB',
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
  //     'Formato de imagem inválido',
  //   )
  //   .transform((files) => {
  //     return files.item(0)
  //   }),
})

export type createPlayerFormData = z.infer<typeof createPlayerFormSchema>
export type createPlayerFormDataInputs = createPlayerFormData
