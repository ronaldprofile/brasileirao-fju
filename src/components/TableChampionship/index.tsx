import { Statitic } from '@/@types'
import cx from 'clsx'
import Link from 'next/link'
import { TableLegend } from './TableLegend'
import { Check, Minus, X } from '@phosphor-icons/react'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  statistics: Statitic
}

interface TableChampionshipProps {
  teams?: Team[]
  withLegend?: boolean
}

const teamLastFiveMatches = [
  {
    id: 1,
    status: 'win',
  },

  {
    id: 2,
    status: 'win',
  },

  {
    id: 3,
    status: 'lose',
  },
  {
    id: 4,
    status: 'draw',
  },

  {
    id: 4,
    status: 'lose',
  },
]

export function TableChampionship({
  teams,
  withLegend = true,
}: TableChampionshipProps) {
  return (
    <div className="pb-2">
      <table className="w-full mt-2 bg-[#202024]">
        <thead className="border-b border-b-[#323238]">
          <tr className="h-8">
            <th className="pl-4 text-left text-xs text-[#a9a9b2]">Clube</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">
              Pts
            </th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Pj</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">
              Vit
            </th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">E</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">
              DER
            </th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Gm</th>
            <th className="uppercase text-center text-[#a9a9b2] text-xs">Gs</th>
            <th className="pr-1 uppercase text-center text-[#a9a9b2] text-xs">
              sg
            </th>

            <th className="pr-1 w-[110px] uppercase text-center text-[#a9a9b2] text-xs">
              Últimas 5
            </th>
          </tr>
        </thead>

        <tbody>
          {teams?.map((team, index) => {
            const position = index + 1

            const topFour = teams.slice(0, 2).includes(team)
            const lastFour = teams.slice(-2).includes(team)

            return (
              <tr
                key={team.uuid}
                className={cx('h-10 hover:bg-[#323238] transition-colors', {
                  'border-l-[3px] border-l-blue-500': topFour,
                  'border-l-[3px] border-l-red-500': lastFour,
                })}
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
                  {team.statistics.matchesPlayed}
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

                <td className="pr-1 text-sm text-center text-[#A9A9B2]">
                  <div className="flex items-center justify-center gap-[2px]">
                    {teamLastFiveMatches.map((match) => {
                      const win = match.status === 'win'
                      const lose = match.status === 'lose'
                      const draw = match.status === 'draw'

                      return (
                        <div
                          key={match.id}
                          className={cx(
                            'w-4 h-4 flex items-center justify-center rounded-full',
                            {
                              'bg-green-500': win,
                              'bg-red-500': lose,
                              'bg-gray-400': draw,
                            },
                          )}
                        >
                          {win ? (
                            <Check size={8} color={'#fff'} />
                          ) : lose ? (
                            <X size={8} color={'#fff'} />
                          ) : (
                            <Minus size={8} color={'#fff'} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {withLegend && <TableLegend />}
    </div>
  )
}
