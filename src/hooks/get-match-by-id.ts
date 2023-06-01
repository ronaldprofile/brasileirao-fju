import { MatchScorers } from '@/@types/match-scorers'
import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useQuery } from '@tanstack/react-query'

export interface MatchPlayer {
  uuid: string
  name: string
  shirtNumber: string
  avatar: string
  nickname: string
  teamId: string
  statisticId: string
}

export interface MatchTeam {
  uuid: string
  name: string
  acronym: string
  shield: string

  players: MatchPlayer[]
  playersIds: string[]
}

export interface MatchConfrontation {
  uuid: string
  confrontationDate: string | null

  homeTeam: MatchTeam
  awayTeam: MatchTeam

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

  const { data: confrontationInfo } = await api.post<{
    data: MatchConfrontation
  }>(url, {
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
