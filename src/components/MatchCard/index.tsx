import { Shield } from '@phosphor-icons/react'
import dayjs from 'dayjs'

import cx from 'clsx'

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

  matchEndsAt: string | null

  confrontationAlreadyHappened: boolean
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const confrontationDate = dayjs(match.confrontationDate).tz(
    'America/Sao_Paulo',
  )

  const isMatchDay = confrontationDate.isSame(dayjs(), 'day')

  const confrontationDateFormatted = confrontationDate.format('ddd, DD/MM')

  const hour = confrontationDate.hour()
  const minute = confrontationDate.minute()

  const minutesFormatted = String(minute).padStart(2, '0')

  const confrontationMatchTime = `${hour}:${minutesFormatted}`

  const matchEndsAt = match.matchEndsAt
  const matchEndsAtFormatted = dayjs(matchEndsAt).format('ddd, DD/MM')

  const awayScore = +match.awayScore
  const homeScore = +match.homeScore

  const homeTeamName = match.homeTeam.name
  const awayTeamName = match.awayTeam.name

  const homeTeamWinner = homeScore > awayScore && homeScore !== awayScore

  return (
    <div className="sm:h-32 px-6 py-4 bg-[#202024] border border-[#323238] flex gap-4 items-center justify-between cursor-pointer hover:bg-[#323238]/60 transition-colors">
      <div className="w-full flex flex-col gap-1">
        <div className="flex items-center gap-3 text-sm text-[#a9a9b2]">
          {match.homeTeam.shield ? (
            <img src={match.homeTeam.shield} alt="" className="w-6" />
          ) : (
            <Shield size={24} />
          )}

          <span>{homeTeamName}</span>
        </div>

        <span className="flex items-center gap-3 text-sm text-[#a9a9b2]">
          {match.awayTeam.shield ? (
            <img src={match.awayTeam.shield} alt="" className="w-6" />
          ) : (
            <Shield size={24} />
          )}
          {awayTeamName}
        </span>
      </div>

      {match.confrontationAlreadyHappened && (
        <div className="flex flex-col gap-1">
          <span
            className={cx('text-sm', {
              'text-[#a9a9b2]': !homeTeamWinner || homeScore === awayScore,
              'font-bold text-white': homeTeamWinner,
            })}
          >
            {homeScore}
          </span>
          <span
            className={cx('text-sm', {
              'text-[#a9a9b2]': homeTeamWinner || homeScore === awayScore,
              'font-bold text-white':
                !homeTeamWinner && awayScore !== homeScore,
            })}
          >
            {awayScore}
          </span>
        </div>
      )}

      <div className="w-32 h-11 sm:h-full pt-3 pl-4 flex flex-col items-center justify-center border-l-[1.2px] border-l-[#323238] ">
        {!match.confrontationDate ? (
          <span className="text-xs text-[#a9a9b2]">A confirmar</span>
        ) : (
          <>
            {match.matchEndsAt ? (
              <>
                <span className="text-xs text-[#a9a9b2] uppercase">fim</span>

                <span className="text-xs text-[#a9a9b2] capitalize">
                  {matchEndsAtFormatted}
                </span>
              </>
            ) : (
              <>
                <span className="text-xs text-[#a9a9b2] capitalize">
                  {!isMatchDay ? confrontationDateFormatted : 'Hoje'}
                </span>
                <span className="text-xs text-[#a9a9b2]">
                  {confrontationMatchTime}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
