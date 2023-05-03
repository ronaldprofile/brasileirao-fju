import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

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

const INITIAL_TEAM: Team = {
  name: '',
  acronym: '',
  players: [],
  shield: '',
  uuid: '',
}

export function useGetTeamByUuid(uuid?: string) {
  const [team, setTeam] = useState<Team>(INITIAL_TEAM)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { team } = await getTeamByUuid(uuid)

      setIsLoading(false)
      setTeam(team)
    }

    fetchData()
  }, [uuid])

  return {
    team,
    isLoading,
  }
}
