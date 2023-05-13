import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Championship {
  uuid: string
  name: string
}

async function getChampionships() {
  const { data: championshipInfo } = await api.get<{ data: Championship[] }>(
    `/championships`,
  )
  const championships = championshipInfo.data

  return {
    championships,
  }
}

export function useChampionships() {
  return useQuery(['championships'], async () => await getChampionships())
}
