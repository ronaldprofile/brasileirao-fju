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

  const { isLoading, team } = useGetTeamByUuid(id)

  const teamPlayersIsEmpty = team.players.length === 0

  useEffect(() => {
    setTeamId(id)
  }, [id, team])

  return (
    <div className="w-full h-full">
      <Header title={team.name} avatar={team.shield} />

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

              {!isLoading && teamId && !teamPlayersIsEmpty && (
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
                  {team.players.map((player) => {
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
