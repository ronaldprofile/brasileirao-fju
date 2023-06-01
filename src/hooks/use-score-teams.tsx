import { useState } from 'react'

export interface TeamsScore {
  homeTeamScore: number
  awayTeamScore: number
}

export type TeamsScoreKeys = keyof TeamsScore
export type TeamsScoreActions = 'increment' | 'decrement'

export function useScoreTeams() {
  const [teamsScore, setTeamsScore] = useState<TeamsScore>({
    homeTeamScore: 0,
    awayTeamScore: 0,
  })

  function handleChangeScoreTeam(
    team: TeamsScoreKeys,
    action: TeamsScoreActions,
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

  function handleUpdateScoreTeams(value: TeamsScore) {
    setTeamsScore(value)
  }

  return {
    teamsScore,
    handleChangeScoreTeam,
    handleUpdateScoreTeams,
  }
}
