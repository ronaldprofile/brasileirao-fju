import { TableLegend } from './TableLegend'
import { TableHead } from './TableHead'
import { TableBody } from './TableBody'
import { Statitic } from '@/@types'
import { LastRoundsStatus } from '@/hooks/get-teams-championship'

interface Team {
  uuid: string
  name: string
  acronym: string
  shield: string

  statistics: Statitic
  statusLastRounds: Array<{
    status: LastRoundsStatus
  }>
}

export interface TableChampionshipProps {
  teams?: Team[]
}

export function TableChampionship({ teams }: TableChampionshipProps) {
  return (
    <div className="overflow-x-scroll sm:overflow-x-visible">
      <table className="w-full mt-2 bg-[#202024]">
        <TableHead />

        <TableBody teams={teams} />
      </table>

      <TableLegend />
    </div>
  )
}
