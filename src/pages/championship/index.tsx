import { useEffect, useState } from 'react'
import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { MatchCard } from '@/components/MatchCard'
import { useGetMatches } from '@/hooks/get-matches-championship'
import { useRoundsChampionship } from '@/hooks/get-rounds-championship'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Skeleton from 'react-loading-skeleton'
import { MatchCardSkeleton } from '@/components/MatchCard/MatchSkeleton'
import Link from 'next/link'
import cx from 'clsx'

const INITIAL_ROUND = { name: '', uuid: '' }

export default function Championship() {
  const [currentRound, setCurrentRound] = useState(0)

  const { data: roundsList, isLoading: isLoadingRound } =
    useRoundsChampionship()

  const rounds = roundsList?.rounds ?? []
  const roundsTotal = rounds?.length ?? 0
  const round = rounds[currentRound] ?? INITIAL_ROUND

  const { data, isLoading: isLoadingMatches } = useGetMatches(round?.uuid)
  const matchesTotal = data?.matches.length ?? 4

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

  useEffect(() => {
    const currentRound = rounds.findIndex((round) => round.isCurrentRound)

    console.log(currentRound)

    setCurrentRound(currentRound)
  }, [rounds])

  return (
    <div className="h-full w-full">
      <ChampionshipLayout>
        <div>
          <div className="pt-3 px-4 pb-2 flex items-center justify-between bg-[#202024] border-b border-b-[#323238]">
            {isLoadingRound ? (
              <>
                <Skeleton width={100} height={38} />
                <Skeleton width={100} height={26} />
                <Skeleton width={100} height={38} />
              </>
            ) : (
              <>
                <button
                  onClick={handlePreviousRound}
                  className={cx(
                    'p-2 hover:border-none hover:bg-[#323238] transition-all flex items-center gap-2 border border-[#323338] rounded-md',
                    {
                      'invisible opacity-0 pointer-events-none':
                        currentRound === 0,
                    },
                  )}
                >
                  <ArrowLeft size={20} />

                  <span className="hidden sm:block text-sm text-[#a9a9b2]">
                    Rodada anterior
                  </span>
                </button>

                <span className="text-sm text-[#A9A9B2]">
                  {round.name} de {roundsTotal}
                </span>

                <button
                  onClick={handleNextRound}
                  className={cx(
                    'p-2 hover:border-none hover:bg-[#323238] transition-all flex items-center gap-2 border border-[#323338] rounded-md',
                    {
                      'invisible opacity-0 pointer-events-none':
                        currentRound === rounds.length - 1,
                    },
                  )}
                >
                  <span className="hidden sm:block text-sm text-[#a9a9b2]">
                    Próxima rodada
                  </span>
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {isLoadingMatches ? (
                <>
                  {Array.from({ length: matchesTotal }).map((_, index) => {
                    return <MatchCardSkeleton key={index} />
                  })}
                </>
              ) : (
                <>
                  {data?.matches.map((match) => (
                    <Link key={match.uuid} href={`/match/${match.uuid}`}>
                      <MatchCard match={match} />
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </ChampionshipLayout>
    </div>
  )
}
