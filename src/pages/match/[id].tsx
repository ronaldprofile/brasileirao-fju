import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button'
import { DatePicker } from '@/components/DatePicker'
import { Input } from '@/components/Input'
import {
  ArrowLeft,
  X,
  ArrowDown,
  ArrowUp,
  SoccerBall,
} from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import {
  createConfrontationDateFormData,
  createConfrontationDateSchema,
  createConfrontationDateFormDataInputs,
} from '@/schemas/match-time'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetMatchById } from '@/hooks/get-match-by-id'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { api } from '@/lib/axios'
import { getChampionshipIdCookie } from '@/utils/get-championship-id-cookie'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

interface PageQuery extends ParsedUrlQuery {
  id: string
}

interface TeamsScore {
  homeTeamScore: number
  awayTeamScore: number
}

type TeamsScoreKeys = keyof TeamsScore

export default function Match() {
  const router = useRouter()
  const { id: matchId } = router.query as PageQuery

  const { data, isLoading } = useGetMatchById(matchId)

  const [dateCalendar, setDateCalendar] = useState<string | null>(null)

  const [teamsScore, setTeamsScore] = useState<TeamsScore>({
    awayTeamScore: data?.confrontation.awayScore ?? 0,
    homeTeamScore: data?.confrontation.homeScore ?? 0,
  })

  const [buttonMatchEnd, setButtonMatchEnd] = useState(true)
  const queryClient = useQueryClient()

  const { mutate: mutateSaveMatchDate, isLoading: mutationLoading } =
    useMutation(
      async (matchDate: string) => await handleSaveMatchDate(matchDate),
      {
        onError: () => {
          toast.error('Algo deu errado')
        },

        onSuccess: () => {
          queryClient.invalidateQueries(['match', matchId])
          toast.success('Data do confronto salva')
        },
      },
    )

  const { mutate: mutateMatchEnd, isLoading: mutationMatchEndLoading } =
    useMutation(async () => await handleMatchEnd(), {
      onError: () => {
        toast.error('Algo deu errado')
      },

      onSuccess: () => {
        queryClient.invalidateQueries(['match', matchId])
        toast.success('Jogo encerrado')
      },
    })

  async function handleSaveMatchDate(matchDate: string) {
    const id = getChampionshipIdCookie()

    await api.put(`/confrontations/update/${matchId}`, {
      championshipId: id,
      confrontationDate: matchDate,
    })
  }

  const { handleSubmit, register, formState, reset } =
    useForm<createConfrontationDateFormData>({
      resolver: zodResolver(createConfrontationDateSchema),
    })

  const { errors } = formState

  async function handleCreateConfrontationDate(
    data: createConfrontationDateFormDataInputs,
  ) {
    const confrontationDateFormatted = `${dateCalendar} ${data.hour}:${data.minute}:00`

    mutateSaveMatchDate(confrontationDateFormatted)

    reset()
  }

  const { awayTeamScore, homeTeamScore } = teamsScore
  const teamsScoreEmpty = awayTeamScore === 0 && homeTeamScore === 0

  async function handleMatchEnd() {
    if (teamsScoreEmpty) {
      return
    }

    const id = getChampionshipIdCookie()

    await api.put(`/confrontations/update/${matchId}`, {
      championshipId: id,
      awayScore: awayTeamScore,
      homeScore: homeTeamScore,
    })
  }

  function handleSelectDayCalendar(date: string) {
    setDateCalendar(date)
  }

  function handleChangeScoreTeam(
    team: TeamsScoreKeys,
    action: 'increment' | 'decrement',
  ) {
    const key = team

    if (action === 'increment') {
      handleIncremetScoreTeam(key)
    } else {
      handleDecremetScoreTeam(key)
    }
  }

  function handleIncremetScoreTeam(team: TeamsScoreKeys) {
    setTeamsScore((prevState) => ({
      ...prevState,
      [team]: prevState[team] + 1,
    }))
  }

  function handleDecremetScoreTeam(team: TeamsScoreKeys) {
    setTeamsScore((prevState) => {
      const teamsScore = { ...prevState }

      if (teamsScore[team] > 0) {
        teamsScore[team] -= 1
      }

      return teamsScore
    })
  }

  const awayTeamId = data?.confrontation.awayTeam.uuid
  const awayTeamName = data?.confrontation.awayTeam.name
  const awayTeamImage = data?.confrontation.awayTeam.shield

  const homeTeamId = data?.confrontation.homeTeam.uuid
  const homeTeamName = data?.confrontation.homeTeam.name
  const homeTeamImage = data?.confrontation.homeTeam.shield

  const confrontationDate = data?.confrontation.confrontationDate ?? null
  const confrontationAlreadyHappened =
    data?.confrontation.confrontationAlreadyHappened

  const matchEndsAtDate = dayjs(data?.confrontation?.matchEndsAt ?? '').format(
    'ddd, DD/MM',
  )

  const today = dayjs()
  const matchAlreadyStarted = today.isAfter(confrontationDate)

  useEffect(() => {
    if (!teamsScoreEmpty) {
      setButtonMatchEnd(false)
    } else {
      setButtonMatchEnd(true)
    }
  }, [teamsScoreEmpty])

  useEffect(() => {
    setTeamsScore({
      awayTeamScore: data?.confrontation.awayScore ?? 0,
      homeTeamScore: data?.confrontation.homeScore ?? 0,
    })
  }, [data?.confrontation])

  return (
    <div className="w-full h-full">
      <header className="w-full bg-[#202024] border-b border-b-[#323238]">
        <div className="py-5 px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={router.back}
              className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center hover:bg-[#323238] rounded-md"
            >
              <ArrowLeft size={20} color="#fff" />
            </button>

            <div className="flex items-center gap-1">
              {isLoading ? (
                <>
                  <Skeleton width={100} height={24} />
                  <X size={14} color="#fff" />

                  <Skeleton width={100} height={24} />
                </>
              ) : (
                <>
                  <span className="text-white">
                    {data?.confrontation.awayTeam.name}
                  </span>

                  <X size={14} color="#fff" />

                  <span className="text-white">
                    {data?.confrontation.homeTeam.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mt-6">
        <div className="w-full bg-[#202024] max-w-3xl mx-auto pt-6 pb-6 px-6">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {confrontationAlreadyHappened && (
                <>
                  <span className="text-sm text-[#a9a9b2]">Encerrado</span>
                  <div className="w-[1.5px] h-[1.5px] bg-[#a9a9b2] rounded-full"></div>

                  <span className="text-sm text-[#a9a9b2] capitalize">
                    {matchEndsAtDate}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="w-full mt-4 max-w-[600px] mx-auto flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-3" id="home_team">
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <>
                      <Skeleton height={48} width={48} circle />
                      <Skeleton width={80} />
                    </>
                  ) : (
                    <>
                      <img
                        className="w-12 h-12"
                        src={homeTeamImage}
                        alt={homeTeamName}
                      />

                      <Link
                        href={`/team/${homeTeamId}`}
                        className="hover:underline"
                      >
                        <span className="text-sm text-[#a9a9b2]">
                          {homeTeamName}
                        </span>
                      </Link>
                    </>
                  )}
                </div>

                {confrontationDate &&
                  matchAlreadyStarted &&
                  !confrontationAlreadyHappened && (
                    <div className="flex flex-col justify-between">
                      <button
                        className="w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md"
                        onClick={() =>
                          handleChangeScoreTeam('homeTeamScore', 'increment')
                        }
                      >
                        <ArrowUp />
                      </button>

                      <button
                        className="w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md"
                        onClick={() =>
                          handleChangeScoreTeam('homeTeamScore', 'decrement')
                        }
                      >
                        <ArrowDown />
                      </button>
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-4" id="score">
                {!isLoading && confrontationDate && (
                  <div className="flex items-center" id="away_team_score">
                    <span className="text-4xl">{teamsScore.awayTeamScore}</span>
                  </div>
                )}

                <X size={20} color="#a9a9b2" className="mx-4" />

                {!isLoading && confrontationDate && (
                  <div className="flex items-center" id="home_team_score">
                    <span className="text-4xl">{teamsScore.homeTeamScore}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3" id="away_team">
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <>
                      <Skeleton height={48} width={48} circle />
                      <Skeleton width={80} />
                    </>
                  ) : (
                    <>
                      <img
                        className="w-12 h-12"
                        src={awayTeamImage}
                        alt={awayTeamName}
                      />

                      <Link
                        href={`/team/${awayTeamId}`}
                        className="hover:underline"
                      >
                        <span className="text-sm text-[#a9a9b2]">
                          {awayTeamName}
                        </span>
                      </Link>
                    </>
                  )}
                </div>

                {confrontationDate &&
                  matchAlreadyStarted &&
                  !confrontationAlreadyHappened && (
                    <div className="flex flex-col justify-between">
                      <button
                        className="w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md"
                        onClick={() =>
                          handleChangeScoreTeam('awayTeamScore', 'increment')
                        }
                      >
                        <ArrowUp />
                      </button>

                      <button
                        className="w-8 h-8 flex justify-center items-center hover:bg-[#323238] rounded-md"
                        onClick={() =>
                          handleChangeScoreTeam('awayTeamScore', 'decrement')
                        }
                      >
                        <ArrowDown />
                      </button>
                    </div>
                  )}
              </div>
            </div>

            {confrontationDate &&
              matchAlreadyStarted &&
              !confrontationAlreadyHappened && (
                <Button
                  type="button"
                  onClick={() => mutateMatchEnd()}
                  disabled={buttonMatchEnd}
                >
                  {mutationMatchEndLoading
                    ? 'Encerrando...'
                    : 'Encerrar partida'}
                </Button>
              )}

            {/* Players */}
            <div className="mt-6 border-t border-t-[#323238]">
              <div className="pt-4 flex items-center justify-between">
                <div id="players_team_home">
                  <ul className="flex flex-col gap-1">
                    {data?.confrontation.homeTeam.players.map((player) => {
                      return (
                        <div key={player.uuid}>
                          <li className="text-xs text-[#a9a9b2]">
                            {player.name}
                          </li>
                        </div>
                      )
                    })}
                  </ul>
                </div>

                <div>
                  <SoccerBall size={20} />
                </div>

                <div id="players_away_home">
                  <ul className="flex flex-col gap-1">
                    {data?.confrontation.awayTeam.players.map((player) => {
                      return (
                        <div key={player.uuid}>
                          <li className="text-xs text-[#a9a9b2]">
                            {player.name}
                          </li>
                        </div>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {!isLoading && !confrontationDate && (
            <form
              onSubmit={handleSubmit(handleCreateConfrontationDate)}
              className="mt-10 flex flex-col gap-2"
            >
              <span className="text-sm sm:text-base text-[#e1e1e1]">
                Escolha uma data e horário para o confronto
              </span>

              <DatePicker onSelectDateCalendar={handleSelectDayCalendar} />

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="h-24 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="h-full flex flex-col gap-1">
                    <label className="text-[#E1E1E6] text-sm" htmlFor="hour">
                      Horas
                    </label>

                    <Input
                      id="hour"
                      type="text"
                      error={errors.hour?.message}
                      {...register('hour')}
                      className="text-white appearance-none"
                      placeholder="16"
                    />
                  </div>

                  <div className="h-full flex flex-col gap-1">
                    <label className="text-[#E1E1E6] text-sm" htmlFor="minutes">
                      Minutos
                    </label>

                    <Input
                      id="minutes"
                      type="text"
                      error={errors.minute?.message}
                      {...register('minute')}
                      className="text-white appearance-none"
                      placeholder="30"
                    />
                  </div>
                </div>

                <Button type="submit" className={'sm:flex-1'}>
                  {mutationLoading ? 'Agendando...' : 'Agendar'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
