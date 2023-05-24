import { Shield } from '@phosphor-icons/react'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

interface Match {
  uuid: string
  confrontationDate: string | null

  homeTeam: Team
  awayTeam: Team

  homeScore: number
  awayScore: number

  championshipId: string
  roundId: string
}

interface MatchCardProps {
  match: Match
  matchClosed?: boolean
}

export function MatchCard({ match, matchClosed = false }: MatchCardProps) {
  const date = dayjs(match.confrontationDate).tz('America/Sao_Paulo')
  const formattedDate = date.format('ddd, DD/MM')

  const hour = date.hour()
  const minute = date.minute()

  const matchTime = `${hour}:${minute}`

  return (
    <div className="sm:h-32 px-6 py-4 bg-[#202024] border border-[#323238] flex flex-col gap-4 sm:items-center sm:flex-row sm:justify-between cursor-pointer hover:bg-[#323238]/60 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-3 text-sm text-[#a9a9b2]">
          {match.awayTeam.shield ? (
            <img src={match.awayTeam.shield} alt="" className="w-6" />
          ) : (
            <Shield size={24} />
          )}
          {match.awayTeam.name}
        </span>

        <span className="flex items-center gap-3 text-sm text-[#a9a9b2]">
          {match.homeTeam.shield ? (
            <img src={match.homeTeam.shield} alt="" className="w-6" />
          ) : (
            <Shield size={24} />
          )}
          {match.homeTeam.name}
        </span>
      </div>

      <div className="h-full pt-3 sm:pl-4 flex flex-col items-center justify-center border-t-[1.2px] border-t-[#323238] sm:border-t-0 sm:border-l-[1.2px] sm:border-l-[#323238] ">
        {!match.confrontationDate ? (
          <span className="text-xs text-[#a9a9b2]">A confirmar</span>
        ) : (
          <>
            <span className="text-xs text-[#a9a9b2]">{formattedDate}</span>
            <span className="text-xs text-[#a9a9b2]">{matchTime}</span>
          </>
        )}

        {/* {matchClosed ? (
          <>
            <span className="text-xs text-[#a9a9b2] uppercase">fim</span>
            <span className="text-xs text-[#a9a9b2]">Hoje</span>
          </>
        ) : (
          <>
            <span className="text-xs text-[#a9a9b2]">Sáb., 29/04</span>
            <span className="text-xs text-[#a9a9b2]">16:30</span>
          </>
        )} */}
      </div>
    </div>
  )
}
