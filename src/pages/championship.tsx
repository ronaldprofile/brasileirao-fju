import { useState } from 'react'
import { ChampionshipTabContent } from '@/components/ChampionshipTabContent'
import { ChampionshipTabs } from '@/components/ChampionshipTabs'
import { TabsOptions } from '@/@types/tab.options'

export default function Championship() {
  const [tabActive, setTabActive] = useState<TabsOptions>('classification')

  function handleChangeTabActive(tab: TabsOptions) {
    setTabActive(tab)
  }

  return (
    <div className="w-screen h-screen">
      <header className="flex flex-col bg-[#202024] border-b border-b-[#323238]">
        <div className="p-6">
          <strong className="text-white">Brasileirão</strong>
        </div>

        <ChampionshipTabs
          tabActive={tabActive}
          onChangeTabActive={handleChangeTabActive}
        />
      </header>

      <main className="mt-6">
        <ChampionshipTabContent tabActive={tabActive} />
      </main>
    </div>
  )
}
