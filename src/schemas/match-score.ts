import { z } from 'zod'

const player = z.object({
  uuid: z.string(),
  name: z.string(),
  shirtNumber: z.string(),
  avatar: z.string(),
  nickname: z.string(),
  teamId: z.string(),
  statisticId: z.string(),
})

type Player = z.infer<typeof player>

type PlayerKeys = keyof Player

const playerSchema = player.refine(
  (value) => Object.keys(value).every((key) => value[key as PlayerKeys] !== ''),
  {
    message: 'Jogador é obrigatório',
  },
)

export const matchScoreSchema = z.object({
  homeTeam: z.array(
    z.object({
      player: playerSchema,
      score: z
        .number({
          invalid_type_error: 'Preencha este campo',
          required_error: 'Preencha este campo',
        })
        .min(0),
    }),
  ),

  awayTeam: z.array(
    z.object({
      player: playerSchema,
      score: z.number({
        invalid_type_error: 'Preencha este campo',
        required_error: 'Preencha este campo',
      }),
    }),
  ),
})

export type createMatchScoreFormData = z.infer<typeof matchScoreSchema>
