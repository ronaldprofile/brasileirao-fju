import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

async function getTeamChampionship() {
  const { data: teamsList } = await api.get<{ data: Team[] }>('/teams')
  const teams = teamsList.data
  return { teams }
}

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const teamsIsEmpty = teams.length === 0

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { teams } = await getTeamChampionship()

      setIsLoading(false)
      setTeams(teams)
    }

    fetchData()
  }, [])

  return {
    teams,
    teamsIsEmpty,
    isLoading,
  }
}
