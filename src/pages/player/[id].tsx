import { useGetPlayerByUuid } from '@/hooks/get-player-by-uuid'
import { ArrowLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import Skeleton from 'react-loading-skeleton'

interface PageQuery extends ParsedUrlQuery {
  id: string
}

export default function PlayerProfile() {
  const router = useRouter()
  const { id } = router.query as PageQuery
  const [playerId, setPlayerId] = useState<string>(id)

  const { player, isLoading } = useGetPlayerByUuid(playerId)

  useEffect(() => {
    setPlayerId(id)
  }, [id])

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-full max-w-lg mx-4 sm:mx-0 bg-[#202024] border border-[#323238] rounded-md">
        <div className="p-6">
          {isLoading ? (
            <>
              <div className="flex flex-col items-center gap-3">
                <Skeleton width={160} height={160} circle />

                <Skeleton width={100} />
              </div>

              <div className="mt-6">
                <Skeleton width={90} />

                <div className="flex items-center gap-2">
                  <Skeleton width={120} height={24} />
                  <Skeleton circle width={24} height={24} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={player.avatar}
                  alt=""
                  className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-full"
                />

                <strong className="text-xl sm:text-2xl">{player.name}</strong>
              </div>

              <div className="mt-6">
                <span className="text-sm text-[#a9a9b2]">Equipe atual</span>

                {player.team && (
                  <div>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-[#a9a9b2] hover:underline underline-offset-2 decoration-current transition"
                    >
                      {player.team.name}
                      <img
                        src={player.team.shield}
                        alt={player.team.name}
                        className="w-6"
                      />
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={router.back}
        className="absolute top-8 left-6 w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center hover:bg-[#323238] rounded-md"
      >
        <ArrowLeft size={24} color="#fff" />
      </button>
    </div>
  )
}
