import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

interface Round {
  uuid: string
  name: string
  isCurrentRound: boolean
}

async function getRoundsChampionship() {
  const id = getChampionshipIdCookie()

  const { data: roundsList } = await api.post<{ data: Round[] }>('/rounds', {
    championshipId: id,
  })

  const rounds = roundsList.data
  return {
    rounds,
  }
}

export function useRoundsChampionship() {
  return useQuery(['rounds'], async () => await getRoundsChampionship())
}
