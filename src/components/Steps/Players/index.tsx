// import { useState } from 'react'
import { FormBox } from '@/components/FormBox'
import { MagnifyingGlass } from '@phosphor-icons/react'

import { ButtonNextStep } from '../ButtonNextStep'
import { Input } from '@/components/Input'

interface StepPlayersProps {
  handleNextStepForm: () => void
}

export function StepPlayers({ handleNextStepForm }: StepPlayersProps) {
  // const [players, setPlayers] = useState([])

  // async function handleSearchPlayer() {}

  // const nextStepButtonDisabled = players.length === 0

  return (
    <FormBox>
      <div className="p-6 mb-4 border border-[#323228] rounded-md">
        <div className="flex justify-between items-center">
          <strong className="text-[#E1E1E6] font-medium">
            Jogadores 0 de 5
          </strong>

          {/* <Button outlined className="flex justify-center items-center gap-2">
            Adicionar
            <Plus size={18} color="#fff" className="hidden sm:block" />
          </Button> */}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Input placeholder="Busque por um jogador" className="w-full" />

          <button className="h-12 w-14 group hover:bg-[#00875F] border border-[#00875F] focus:outline-none flex items-center justify-center rounded-md transition-colors">
            <MagnifyingGlass
              size={20}
              className="text-[#00875F] group-hover:text-white"
            />
          </button>
        </div>
      </div>

      <ButtonNextStep
        onNextStep={handleNextStepForm}
        // disabled={nextStepButtonDisabled}
      />
    </FormBox>
  )
}
