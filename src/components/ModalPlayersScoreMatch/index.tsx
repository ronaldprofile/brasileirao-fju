import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Input } from '../Input'
import {
  Modal as ModalComponent,
  ModalWrapper,
  ModalProps,
  ModalTitle,
} from '../Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  matchScoreSchema,
  createMatchScoreFormData,
} from '@/schemas/match-score'
import { toast } from 'react-toastify'
import { TeamsScore } from '@/hooks/use-score-teams'
import { MatchConfrontation } from '@/hooks/get-match-by-id'

interface ModalPlayersScoreMatchProps extends ModalProps {
  closeModal: () => void

  teamsScores: TeamsScore
  matchConfrontation: MatchConfrontation | undefined
  handleSavePlayersScorers: (data: createMatchScoreFormData) => void
}

export function ModalPlayersScoreMatch({
  open,
  closeModal,
  matchConfrontation,
  handleSavePlayersScorers,
  teamsScores,
}: ModalPlayersScoreMatchProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState,
    setValue,
    reset,
    clearErrors,
  } = useForm<createMatchScoreFormData>({
    resolver: zodResolver(matchScoreSchema),
  })

  const { errors } = formState

  const { awayTeamScore, homeTeamScore } = teamsScores

  const homeTeamGoalsScored = homeTeamScore
  const awayTeamGoalsScored = awayTeamScore

  async function handleMatchScore(data: createMatchScoreFormData) {
    const homeTeamGoalsScoredPlayers = data.homeTeam.reduce(
      (acc, currentValue) => {
        return acc + currentValue.score
      },
      0,
    )

    const awayTeamGoalsScoredPlayers = data.awayTeam.reduce(
      (acc, currentValue) => {
        return acc + currentValue.score
      },
      0,
    )

    const playersGoalsGreaterThanTeamsGoals =
      homeTeamGoalsScoredPlayers > homeTeamGoalsScored! ||
      awayTeamGoalsScoredPlayers > awayTeamGoalsScored!

    const playersGoalsLessThanTeamsGoals =
      homeTeamGoalsScoredPlayers < homeTeamGoalsScored! ||
      awayTeamGoalsScoredPlayers < awayTeamGoalsScored!

    if (playersGoalsGreaterThanTeamsGoals || playersGoalsLessThanTeamsGoals) {
      toast.error(
        'Gols dos jogadores não corresponde ao total de gols do time na partida',
      )

      return
    }

    handleSavePlayersScorers(data)

    handleCloseModal()
  }

  function handleCloseModal() {
    reset()

    closeModal()
  }

  function handleClearErrorsForm(team: 'homeTeam' | 'awayTeam', index: number) {
    const homeTeamPlayerScore = watch(`homeTeam.${index}.score`)
    const awayTeamPlayerScore = watch(`awayTeam.${index}.score`)

    const homeTeamPlayerScoreIsValid =
      homeTeamPlayerScore === 0 || homeTeamPlayerScore > 0

    const awayTeamPlayerScoreIsValid =
      awayTeamPlayerScore === 0 || awayTeamPlayerScore > 0

    if (team === 'homeTeam' && homeTeamPlayerScoreIsValid) {
      clearErrors(`homeTeam.${index}.score`)
    } else if (team === 'awayTeam' && awayTeamPlayerScoreIsValid) {
      clearErrors(`awayTeam.${index}.score`)
    }
  }

  return (
    <ModalComponent open={open} onOpenChange={handleCloseModal}>
      <ModalWrapper>
        <ModalTitle>Marcadores da partida</ModalTitle>

        <form onSubmit={handleSubmit(handleMatchScore)} className="mt-4">
          <div className="pt-4 flex flex-col justify-between">
            <div id="players_team_home">
              <div className="flex items-center justify-between">
                <img
                  src={matchConfrontation?.homeTeam.shield}
                  alt=""
                  className="w-10"
                />

                <p className="text-[#a9a9b2]">
                  Gols na partida{' '}
                  <span className="font-bold">{homeTeamGoalsScored}</span>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-1">
                {matchConfrontation?.homeTeam?.players.map((player, index) => {
                  const messageErrorScore =
                    errors.homeTeam && errors.homeTeam[index]?.score?.message

                  return (
                    <div key={player.uuid} className="relative">
                      <label
                        htmlFor={`player_score=${player.uuid}`}
                        className="text-sm text-[#a9a9b2]"
                      >
                        {player.name}
                      </label>

                      <Input
                        type="number"
                        id={`player_score=${player.uuid}`}
                        placeholder="Gols"
                        {...register(`homeTeam.${index}.score`, {
                          valueAsNumber: true,
                        })}
                        onChange={(e) => {
                          const updatedPlayer = { ...player }

                          setValue(
                            `homeTeam.${index}.score`,
                            Number(e.target.value),
                          )

                          setValue(`homeTeam.${index}.player`, updatedPlayer)

                          handleClearErrorsForm('homeTeam', index)
                        }}
                        error={messageErrorScore}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="my-6 border-t border-t-[#323238]"></div>

            <div id="players_away_home">
              <div className="flex items-center justify-between">
                <img
                  src={matchConfrontation?.awayTeam.shield}
                  alt=""
                  className="w-10"
                />

                <p className="text-[#a9a9b2]">
                  Gols na partida{' '}
                  <span className="font-bold">{awayTeamGoalsScored}</span>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-1">
                {matchConfrontation?.awayTeam?.players.map((player, index) => {
                  const messageErrorScore =
                    errors.awayTeam && errors.awayTeam[index]?.score?.message

                  return (
                    <div key={player.uuid}>
                      <label
                        htmlFor={`player_score=${player.uuid}`}
                        className="text-sm text-[#a9a9b2]"
                      >
                        {player.name}
                      </label>

                      <Input
                        type="number"
                        id={`player_score=${player.uuid}`}
                        placeholder="Gols"
                        {...register(`awayTeam.${index}.score`, {
                          valueAsNumber: true,
                        })}
                        onChange={(e) => {
                          const updatedPlayer = { ...player }

                          setValue(
                            `awayTeam.${index}.score`,
                            e.target.valueAsNumber,
                          )
                          setValue(`awayTeam.${index}.player`, updatedPlayer)

                          handleClearErrorsForm('awayTeam', index)
                        }}
                        error={messageErrorScore}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            Salvar
          </Button>
        </form>
      </ModalWrapper>
    </ModalComponent>
  )
}
