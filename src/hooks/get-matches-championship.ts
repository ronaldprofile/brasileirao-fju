import { api } from '@/lib/axios'
import { getChampionshipIdStorage } from '@/utils/getChampionshipIdStorage'
import { useQuery } from '@tanstack/react-query'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

interface Matches {
  uuid: string
  confrontationDate: Date | null
  homeTeam: Team
  awayTeam: Team

  homeScore: number
  awayScore: number

  championshipId: string
  roundId: string
}

async function getMatchesChampionship(roundId: string) {
  const id = getChampionshipIdStorage()

  const { data: matchesList } = await api.post<{ data: Matches[] }>(
    '/confrontations',
    {
      championshipId: id,
      roundId,
    },
  )

  const matches = matchesList.data

  return { matches }
}

export function useGetMatches(roundId: string) {
  return useQuery(
    ['matches', roundId],
    async () => await getMatchesChampionship(roundId),
  )
}
