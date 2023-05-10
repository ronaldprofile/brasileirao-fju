import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

interface GetTeamParams {
  incompleteTeams: number
}

async function getTeamChampionship(paramsOptions?: GetTeamParams) {
  const { data: teamsList } = await api.get<{ data: Team[] }>('/teams', {
    params: {
      ...paramsOptions,
    },
  })
  const teams = teamsList.data
  return { teams }
}

export function useTeams(params?: GetTeamParams) {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const teamsIsEmpty = teams.length === 0

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { teams } = await getTeamChampionship(params)

      setIsLoading(false)
      setTeams(teams)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    teams,
    teamsIsEmpty,
    isLoading,
  }
}
