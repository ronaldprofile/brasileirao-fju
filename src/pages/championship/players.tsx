import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { PlayerCard } from '@/components/PlayerCard'
import { PlayerSkeleton } from '@/components/PlayerCard/PlayerSkeleton'
import { usePlayers } from '@/hooks/get-players-championship'
import cx from 'clsx'
import Link from 'next/link'

export default function Players() {
  const { data, isLoading } = usePlayers()
  const playersIsEmpty = data?.players.length === 0

  const orderPlayers = data?.players.sort((a, _) => {
    if (a.team) {
      return 1
    } else {
      return -1
    }
  })

  return (
    <ChampionshipLayout>
      <div className={cx('bg-[#202024]')}>
        <div className="px-2 pt-2 pb-10">
          {isLoading && (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 14 }).map((_, index) => (
                <PlayerSkeleton key={index} />
              ))}
            </div>
          )}

          {!isLoading && !playersIsEmpty && (
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {orderPlayers?.map((player) => {
                return (
                  <Link href={`/player/${player.uuid}`} key={player.uuid}>
                    <PlayerCard player={player} modeShow="championship" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </ChampionshipLayout>
  )
}
