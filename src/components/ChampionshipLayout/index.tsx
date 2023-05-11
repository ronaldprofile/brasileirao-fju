import React from 'react'
import { ChampionshipTabs } from '../ChampionshipTabs'

interface ChampionshipLayoutProps {
  children: React.ReactNode
}

export function ChampionshipLayout({ children }: ChampionshipLayoutProps) {
  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 z-50 w-full">
        <header className="flex flex-col bg-[#202024] border-b border-b-[#323238]">
          <div className="p-6">
            <strong className="text-white">Brasileirão</strong>
          </div>

          <ChampionshipTabs />
        </header>
      </div>

      <main className="mt-32">
        <div className="w-full max-w-3xl h-12 mx-auto px-6 lg:px-0">
          {children}
        </div>
      </main>
    </div>
  )
}
