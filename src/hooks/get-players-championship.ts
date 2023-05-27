import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

interface Team {
  name: string
  shield: string
}

interface Player {
  uuid: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string

  team: Team | null

  statistics: {
    goalsScored: number
    championshipId: string
  }
}

async function getPlayersChampionship() {
  const id = getChampionshipIdCookie()
  const response = await api.get<{ data: Player[] }>(
    `/players/?championshipId=${id}`,
  )

  const { data: players } = response.data

  return {
    players,
  }
}

export function usePlayers() {
  return useQuery(['players'], async () => await getPlayersChampionship())
}
