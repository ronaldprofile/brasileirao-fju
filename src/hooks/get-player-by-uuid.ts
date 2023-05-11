import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Team {
  name: string
  shield: string
}

interface Player {
  uuid: string
  name: string
  avatar: string
  nickname: string
  shirtNumber: string

  team: Team | null
}

async function getPlayerByUuid(uuid?: string) {
  const route = uuid ? `/players/show/${uuid}` : ''

  const { data: playerResult } = await api.get<{ data: Player }>(route)

  const player = playerResult.data
  return { player }
}

const INITIAL_PLAYER: Player = {
  uuid: '',
  avatar: '',
  name: '',
  nickname: '',
  shirtNumber: '',
  team: null,
}

export function useGetPlayerByUuid(uuid?: string) {
  return useQuery(['player', uuid], async () => await getPlayerByUuid(uuid), {
    initialData: () => {
      return {
        player: INITIAL_PLAYER,
      }
    },
  })
}
