import React from 'react'
import { ChampionshipTabs } from '../ChampionshipTabs'

interface ChampionshipLayoutProps {
  children: React.ReactNode
}

export function ChampionshipLayout({ children }: ChampionshipLayoutProps) {
  return (
    <div className="w-full">
      <header className="flex flex-col bg-[#202024] border-b border-b-[#323238]">
        <div className="p-6">
          <strong className="text-white">Brasileirão</strong>
        </div>

        <ChampionshipTabs />
      </header>

      <main className="mt-6">
        <div className="w-full max-w-3xl h-12 mx-auto px-6 lg:px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
