import { Statitic } from '@/@types'
import Link from 'next/link'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  statistics: Statitic
}

interface TableChampionshipProps {
  teams?: Team[]
}

export function TableChampionship({ teams }: TableChampionshipProps) {
  return (
    <table className="w-full mt-2 bg-[#202024]">
      <thead className="border-b border-b-[#323238]">
        <tr className="h-8">
          <th className="pl-4 text-left text-xs text-[#a9a9b2]">Clube</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">Pts</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">Pj</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">Vit</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">E</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">DER</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">Gm</th>
          <th className="uppercase text-center text-[#a9a9b2] text-xs">Gs</th>
          <th className="pr-1 uppercase text-center text-[#a9a9b2] text-xs">
            sg
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#323238]">
        {teams?.map((team, index) => {
          const position = index + 1

          return (
            <tr
              key={team.uuid}
              className="h-10 hover:bg-[#323238] transition-colors"
            >
              <td className="h-10 pl-4 text-sm text-[#A9A9B2]">
                <Link
                  href={`/team/${team.uuid}`}
                  className="flex items-center gap-3"
                >
                  <span>{position}</span>
                  <img src={team.shield} alt="" className="w-6 h-6" />
                  <span className="ml-2">{team.name}</span>
                </Link>
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.points}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.matchesPlayed ?? 0}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.victories}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.draws}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.loses}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.goalsScored}
              </td>
              <td className="text-sm text-center text-[#A9A9B2]">
                {team.statistics.goalsConceded}
              </td>
              <td className="pr-1 text-sm text-center text-[#A9A9B2]">
                {team.statistics.goalDifference}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
