import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { PlayerCard } from '@/components/PlayerCard'
import { usePlayers } from '@/hooks/use-players-championship'
import { CircleNotch } from '@phosphor-icons/react'
import cx from 'clsx'
import Link from 'next/link'

export default function Players() {
  const { isLoading, players } = usePlayers()
  const playersIsEmpty = players.length === 0

  return (
    <ChampionshipLayout>
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

        {!isLoading && !playersIsEmpty && (
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
            {players?.map((player) => {
              return (
                <Link href={`/player/${player.uuid}`} key={player.uuid}>
                  <PlayerCard player={player} modeShow="championship" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </ChampionshipLayout>
  )
}
