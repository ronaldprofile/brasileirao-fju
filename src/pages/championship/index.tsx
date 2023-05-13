import { useState } from 'react'
import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { MatchCard } from '@/components/MatchCard'
import { useGetMatches } from '@/hooks/get-matches-championship'
import { useRoundsChampionship } from '@/hooks/get-rounds-championship'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const INITIAL_ROUND = { name: '', uuid: '' }

export default function Championship() {
  const [currentRound, setCurrentRound] = useState(0)

  const { data: roundsList } = useRoundsChampionship()

  const rounds = roundsList?.rounds ?? []
  const roundsTotal = rounds?.length ?? 0
  const round = rounds[currentRound] ?? INITIAL_ROUND

  const { data } = useGetMatches(round?.uuid)

  function handleNextRound() {
    if (currentRound < roundsTotal - 1) {
      setCurrentRound((prevState) => prevState + 1)
    }
  }

  function handlePreviousRound() {
    if (currentRound > 0) {
      setCurrentRound((prevState) => prevState - 1)
    }
  }

  return (
    <div className="h-full w-full">
      <ChampionshipLayout>
        <div>
          <div className="pt-3 px-4 pb-2 flex items-center justify-between bg-[#202024] border-b border-b-[#323238]">
            <button
              onClick={handlePreviousRound}
              className="p-2 hover:border-none hover:bg-[#323238] transition-all flex items-center gap-2 border border-[#323338] rounded-md"
            >
              <ArrowLeft size={20} />
              <span className="text-sm text-[#a9a9b2]">Rodada anterior</span>
            </button>

            <span className="text-sm text-[#A9A9B2]">
              {round.name} de {roundsTotal}
            </span>

            <button
              onClick={handleNextRound}
              className="p-2 hover:border-none hover:bg-[#323238] transition-all flex items-center gap-2 border border-[#323338] rounded-md"
            >
              <span className="text-sm text-[#a9a9b2]">Próxima rodada</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 divide-x divide-y divide-[#323238]">
              {data?.matches.map((match) => (
                <MatchCard key={match.uuid} match={match} />
              ))}
            </div>
          </div>
        </div>
      </ChampionshipLayout>
    </div>
  )
}
