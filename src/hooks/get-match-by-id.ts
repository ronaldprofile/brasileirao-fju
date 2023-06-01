import { MatchScorers } from '@/@types/match-scorers'
import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

interface Player {
  uuid: string
  name: string
}

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  players: Player[]
  playersIds: string[]
}

interface Matche {
  uuid: string
  confrontationDate: string | null

  homeTeam: Team
  awayTeam: Team

  homeScore: number
  awayScore: number

  scorers: MatchScorers

  championshipId: string
  roundId: string
  matchEndsAt: string | null
  confrontationAlreadyHappened: boolean
}

async function getMatchById(uuid: string) {
  const id = getChampionshipIdCookie()

  const url = `/confrontations/show/${uuid}`

  const { data: confrontationInfo } = await api.post<{ data: Matche }>(url, {
    championshipId: id,
    roundId: '',
  })

  const confrontation = confrontationInfo.data

  return {
    confrontation,
  }
}

export function useGetMatchById(uuid: string) {
  return useQuery(['match', uuid], async () => await getMatchById(uuid))
}
