import { api } from '@/lib/axios'
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
}

async function getPlayersChampionship() {
  const response = await api.get<{ data: Player[] }>('/players')

  const { data: players } = response.data

  return {
    players,
  }
}

export function usePlayers() {
  return useQuery(['players'], async () => await getPlayersChampionship())
}
