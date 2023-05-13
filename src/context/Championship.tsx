import { ReactNode, useContext, createContext, useEffect } from 'react'
import { useChampionships } from '@/hooks/get-championships'

interface ChampionshipContextData {
  championshipId: string
}

interface ChampionshipProviderProps {
  children: ReactNode
}

export const ChampionshipContext = createContext({} as ChampionshipContextData)

export function ChampionshipProvider({ children }: ChampionshipProviderProps) {
  const { data } = useChampionships()

  const championshipId = data?.championships[0].uuid ?? ''

  useEffect(() => {
    localStorage.setItem('@ch:id', championshipId)
  }, [championshipId])

  return (
    <ChampionshipContext.Provider
      value={{
        championshipId,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  )
}

export const useChampionshipId = () => useContext(ChampionshipContext)
