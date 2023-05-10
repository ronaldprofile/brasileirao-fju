import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Player {
  uuid: string
  name: string
  nickname: string
  shirtNumber: string
  avatar: string

  team: null
}

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  players: Player[]
}

async function getTeamByUuid(uuid?: string) {
  const route = uuid ? `/teams/show/${uuid}` : ''

  const { data: teamsList } = await api.get<{ data: Team }>(route)
  const team = teamsList.data
  return { team }
}

export function useGetTeamByUuid(uuid?: string) {
  return useQuery(['team', uuid], async () => await getTeamByUuid(uuid))
}
