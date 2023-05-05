import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { delay } from '@/utils/delay-api'

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

async function getPlayerByUuid(uuid?: string) {
  const route = uuid ? `/players/show/${uuid}` : ''

  const { data: playerResult } = await api.get<{ data: Player }>(route)

  const player = playerResult.data
  return { player }
}

const INITIAL_PLAYER: Player = {
  uuid: '',
  avatar: '',
  name: '',
  nickname: '',
  shirtNumber: '',
  team: null,
}

export function useGetPlayerByUuid(uuid?: string) {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const { player } = await getPlayerByUuid(uuid)

      setPlayer(player)

      await delay(1500)

      setIsLoading(false)
    }

    fetchData()
  }, [uuid])

  return {
    player,
    isLoading,
  }
}
