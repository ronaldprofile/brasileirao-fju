import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

interface Championship {
  name: string
}

async function getChampionshipByUuid() {
  const id = getChampionshipIdCookie()

  const { data: championshipInfo } = await api.get<{ data: Championship }>(
    `/championships/show/${id}`,
  )
  const championship = championshipInfo.data

  return {
    championship,
  }
}

export function useUniqueChampionship() {
  return useQuery(['championship'], async () => await getChampionshipByUuid())
}
