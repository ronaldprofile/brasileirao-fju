import { Shield } from '@phosphor-icons/react'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string
}

interface Match {
  uuid: string
  confrontationDate: Date | null
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
  return (
    <div className="h-32 px-6 py-4 bg-[#202024] border-l border-t  border-[#323238] flex items-center justify-between cursor-pointer hover:bg-[#323238]/60 transition-colors">
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

      <div className="h-full pl-4 flex flex-col items-center justify-center border-l-[1.2px] border-l-[#323238] ">
        {matchClosed ? (
          <>
            <span className="text-xs text-[#a9a9b2] uppercase">fim</span>
            <span className="text-xs text-[#a9a9b2]">Hoje</span>
          </>
        ) : (
          <>
            <span className="text-xs text-[#a9a9b2]">Sáb., 29/04</span>
            <span className="text-xs text-[#a9a9b2]">16:30</span>
          </>
        )}
      </div>
    </div>
  )
}
