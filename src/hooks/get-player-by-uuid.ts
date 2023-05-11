import { api } from '@/lib/axios'
import { delay } from '@/utils/delay-api'
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

  await delay()

  return { player }
}

export function useGetPlayerByUuid(uuid?: string) {
  return useQuery(['player', uuid], async () => await getPlayerByUuid(uuid))
}
