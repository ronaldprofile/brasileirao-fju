import { ChampionshipLayout } from '@/components/ChampionshipLayout'
import { Smiley } from '@phosphor-icons/react'

export default function Statistics() {
  return (
    <ChampionshipLayout>
      <div className="pt-3 px-4 pb-2 flex items-center gap-3 bg-[#202024] border-b border-b-[#323238]">
        <span className="text-sm text-[#A9A9B2]">Nada por aqui ainda...</span>
        <Smiley size={20} color="#a9a9b2" />
      </div>
    </ChampionshipLayout>
  )
}
