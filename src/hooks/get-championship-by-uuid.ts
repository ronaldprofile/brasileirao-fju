import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Championship {
  name: string
}

async function getChampionshipByUuid() {
  const championshipId = 'z7xRoR9dWup3JeEEBQyr'

  const { data: championshipInfo } = await api.get<{ data: Championship }>(
    `/championships/show/${championshipId}`,
  )
  const championship = championshipInfo.data

  return {
    championship,
  }
}

export function useUniqueChampionship() {
  return useQuery(['championship'], async () => await getChampionshipByUuid())
}
