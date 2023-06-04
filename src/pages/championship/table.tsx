import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { TableChampionship } from '@/components/TableChampionship'
import { TableSkeleton } from '@/components/TableChampionship/TableSkeleton'

import { useTeams } from '@/hooks/get-teams-championship'
import Skeleton from 'react-loading-skeleton'

export default function Classification() {
  const { data, isLoading } = useTeams()

  const teamsTotal = data?.teams.length
  const teamsIsEmpty = teamsTotal === 0

  return (
    <ChampionshipLayout>
      <div className="pt-3 px-4 pb-2 flex flex-col bg-[#202024] border-b border-b-[#323238]">
        {isLoading ? (
          <div>
            <Skeleton width={80} />
            <Skeleton width={60} />
          </div>
        ) : (
          <>
            <span className="text-xs text-[#A9A9B2]">Temporada</span>
            <span className="text-sm text-white font-black">2022-23</span>
          </>
        )}
      </div>

      <div className="w-full mt-2 bg-[#202024]">
        {isLoading && <TableSkeleton count={teamsTotal} />}

        {!isLoading && !teamsIsEmpty && (
          <TableChampionship teams={data?.teams} />
        )}
      </div>
    </ChampionshipLayout>
  )
}
