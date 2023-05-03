import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

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
  // : `/teams/show/${teamId}`

  const response = await api.get<{ data: Player[] }>('/players')

  const { data: allPlayers } = response.data

  return {
    allPlayers,
  }
}

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { allPlayers } = await getPlayersChampionship()

      setIsLoading(false)
      setPlayers(allPlayers)
    }

    fetchData()
  }, [])

  return {
    players,
    isLoading,
  }
}
