import { api } from '@/lib/axios'
import { delay } from '@/utils/delay-api'
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

      setPlayers(allPlayers)

      await delay(1800)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return {
    players,
    isLoading,
  }
}
