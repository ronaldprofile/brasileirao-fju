import { TabsOptions } from '@/@types/tab.options'
import { Classification } from './Classification'
import { Matches } from './Matches'

interface ChampionshipTabContentProps {
  tabActive: TabsOptions
}

export function ChampionshipTabContent({
  tabActive,
}: ChampionshipTabContentProps) {
  return (
    <div className="w-full max-w-3xl h-12 mx-auto px-6 lg:px-0">
      {tabActive === 'classification' && <Classification />}
      {tabActive === 'matches' && <Matches />}
    </div>
  )
}
