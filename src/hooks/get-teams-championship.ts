import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

interface GetTeamParams {
  incompleteTeams: number
}

async function getTeamsChampionship(paramsOptions?: GetTeamParams) {
  const id = getChampionshipIdCookie()

  const { data: teamsList } = await api.get<{ data: Team[] }>('/teams', {
    params: {
      ...paramsOptions,
      championshipId: id,
    },
  })
  const teams = teamsList.data
  return { teams }
}

export function useTeams(params?: GetTeamParams) {
  return useQuery(['teams'], async () => await getTeamsChampionship(params))
}
