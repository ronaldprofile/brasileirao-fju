import cx from 'clsx'
import Link from 'next/link'
import { Check, Minus, X } from '@phosphor-icons/react'
import { TableChampionshipProps } from '.'

type TableBodyProps = Omit<TableChampionshipProps, 'withLegend'>

export function TableBody({ teams }: TableBodyProps) {
  return (
    <tbody>
      {teams?.map((team, index) => {
        const position = index + 1

        const topFour = teams.slice(0, 2).includes(team)
        const lastFour = teams.slice(-2).includes(team)

        const orderStatusLastRounds = team.statusLastRounds.sort((a, b) => {
          if (a.status === 'notHappened' && b.status !== 'notHappened') {
            return 1
          }
          if (a.status !== 'notHappened' && b.status === 'notHappened') {
            return -1
          }
          return 0
        })

        return (
          <tr
            key={team.uuid}
            className={cx('h-10 hover:bg-[#323238] transition-colors', {
              'border-l-[3px] border-l-blue-500': topFour,
              'border-l-[3px] border-l-red-500': lastFour,
            })}
          >
            <td className="h-10 pl-4 text-sm text-[#A9A9B2]">
              <div className="w-52 sm:w-auto">
                <Link
                  href={`/team/${team.uuid}`}
                  className="flex items-center gap-3"
                >
                  <span>{position}</span>
                  <img src={team.shield} alt="" className="w-6 h-6" />
                  <span className="ml-2">{team.name}</span>
                </Link>
              </div>
            </td>

            <td className="border-none text-sm text-center whitespace-nowrap text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">{team.statistics.points}</div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">
                {team.statistics.matchesPlayed}
              </div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">{team.statistics.victories}</div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">{team.statistics.draws}</div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">{team.statistics.loses}</div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">{team.statistics.goalsScored}</div>
            </td>

            <td className="border-none text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">
                {team.statistics.goalsConceded}
              </div>
            </td>

            <td className="border-none pr-1 text-sm text-center text-[#A9A9B2]">
              <div className="w-9 sm:w-auto">
                {team.statistics.goalDifference}
              </div>
            </td>

            <td className="border-none pr-1 text-sm text-center text-[#A9A9B2]">
              <div className="flex items-center justify-center gap-[2px]">
                {orderStatusLastRounds.map(({ status }, index) => {
                  const win = status === 'win'
                  const lose = status === 'lose'
                  const draw = status === 'draw'
                  const notHappened = status === 'notHappened'

                  return (
                    <div
                      key={`${status}-${index}`}
                      className={cx(
                        'w-4 h-4 flex items-center justify-center rounded-full',
                        {
                          'bg-green-500': win,
                          'bg-red-500': lose,
                          'bg-blue-500': draw,
                        },
                      )}
                    >
                      {win ? (
                        <Check size={8} color={'#fff'} />
                      ) : lose ? (
                        <X size={8} color={'#fff'} />
                      ) : draw ? (
                        <Minus size={8} color={'#fff'} />
                      ) : (
                        notHappened && (
                          <div className="w-full h-full bg-gray-500 rounded-full" />
                        )
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
  )
}
