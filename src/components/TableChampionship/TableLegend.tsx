import { Check, Minus, X } from '@phosphor-icons/react'

export function TableLegend() {
  return (
    <div className="bg-[#323238] mt-3 mx-2 rounded-md">
      <div className="p-4">
        <p className="text-xs mb-1 text-[#a9a9b2]">Últimas 5 partidas</p>

        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-[3px] text-xs capitalize">
            <div className="w-3 h-3 flex items-center justify-center rounded-full bg-green-500">
              <Check size={8} color={'#fff'} />
            </div>
            <span className="text-[#a9a9b2]">Vitória</span>
          </div>

          <div className="flex items-center gap-[3px] text-xs capitalize">
            <div className="w-3 h-3 flex items-center justify-center rounded-full bg-gray-400">
              <Minus size={8} color={'#fff'} />
            </div>
            <span className="text-[#a9a9b2]">Empate</span>
          </div>

          <div className="flex items-center gap-[3px] text-xs capitalize">
            <div className="w-3 h-3 flex items-center justify-center rounded-full bg-red-500">
              <X size={8} color={'#fff'} />
            </div>
            <span className="text-[#a9a9b2]">Derrota</span>
          </div>
        </div>
      </div>
    </div>
  )
}
