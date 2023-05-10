import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { useGetTeamByUuid } from '@/hooks/use-get-team-by-uuid'
import { CircleNotch } from '@phosphor-icons/react'
import { PlayerCard } from '@/components/PlayerCard'
import cx from 'clsx'

interface PageQuery extends ParsedUrlQuery {
  id: string
}

export default function Team() {
  const { query } = useRouter()
  const { id } = query as PageQuery
  const [teamId, setTeamId] = useState<string>(id)

  const { data, isLoading, status } = useGetTeamByUuid(id)

  useEffect(() => {
    setTeamId(id)
  }, [id, data?.team])

  return (
    <div className="w-full h-full">
      <Header title={data?.team.name ?? ''} avatar={data?.team.shield} />

      <main className="mt-6">
        <div className="w-full max-w-3xl h-12 mx-auto px-6 lg:px-0">
          {teamId && (
            <div
              className={cx(
                'bg-[#202024]',
                isLoading && 'flex justify-center items-center',
              )}
            >
              {isLoading && (
                <div className="p-2  text-white">
                  <CircleNotch size={24} className="animate-spin" />
                </div>
              )}

              {!isLoading && status === 'error' && (
                <div className="p-2 flex justify-center items-center">
                  <span className="text-sm text-[#a9a9b2]">
                    Algo deu errado
                  </span>
                </div>
              )}

              {!isLoading && status === 'success' && (
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
                  {data?.team.players.map((player) => {
                    return (
                      <PlayerCard
                        key={player.uuid}
                        player={player}
                        modeShow="team"
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
