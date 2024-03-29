import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { usePlayers } from '@/hooks/get-players-championship'
import Skeleton from 'react-loading-skeleton'

export default function Statistics() {
  const { data, isLoading } = usePlayers()

  const filteredPlayers = data?.players.filter(
    (player) => player.team && player.statistics.goalsScored > 0,
  )

  return (
    <ChampionshipLayout>
      <div className="pt-3 px-4 pb-2 bg-[#202024] border-b border-b-[#323238]">
        <span className="text-sm text-[#A9A9B2]">Gols</span>

        <div className="mt-3 pb-2 flex items-center justify-between border-b border-b-[#323238]">
          <span className="text-xs text-[#A9A9B2]">Jogador</span>
          <span className="text-xs text-[#A9A9B2]">Gols</span>
        </div>

        {isLoading ? (
          <div className="divide-y divide-[#323238]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="py-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Skeleton circle height={48} width={48} />

                  <div>
                    <Skeleton width={100} />

                    <div className="flex items-center">
                      <Skeleton width={100} />
                    </div>
                  </div>
                </div>

                <Skeleton width={24} height={24} />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#323238]">
            {filteredPlayers?.map((player, index) => (
              <div
                key={player.uuid}
                className="py-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#A9A9B2]">{index + 1}</span>

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />

                  <div className="leading-none">
                    <span className="text-sm text-[#A9A9B2]">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={player.team?.shield}
                        alt=""
                        className="w-5 h-5"
                      />
                      <span className="text-xs text-[#A9A9B2]">
                        {player.team?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <span>{player.statistics.goalsScored}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ChampionshipLayout>
  )
}
