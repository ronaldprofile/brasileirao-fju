import { Statitic } from '@/@types'
import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

export type LastRoundsStatus = 'win' | 'lose' | 'draw' | 'notHappened'
interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  statistics: Statitic
  statusLastRounds: Array<{
    status: LastRoundsStatus
  }>
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
