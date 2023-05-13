import { api } from '@/lib/axios'
import { getChampionshipIdStorage } from '@/utils/getChampionshipIdStorage'
import { useQuery } from '@tanstack/react-query'

interface Round {
  uuid: string
  name: string
}

async function getRoundsChampionship(id: string) {
  const { data: roundsList } = await api.post<{ data: Round[] }>('/rounds', {
    championshipId: id,
  })

  const rounds = roundsList.data
  return {
    rounds,
  }
}

export function useRoundsChampionship() {
  const id = getChampionshipIdStorage()

  return useQuery(['rounds'], async () => await getRoundsChampionship(id))
}
