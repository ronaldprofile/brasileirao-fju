import { useState } from 'react'
import { Loading } from '@/components/Loading'
import { useConfetti } from '@/hooks/useConfetti'

export default function Success() {
  const [isLoading, setIsLoading] = useState(true)

  const { Confetti, showConfetti, hideConfetti } = useConfetti()

  function handleProgressAnimation() {
    setIsLoading(false)
    startConffetiAnimation()
  }

  const startConffetiAnimation = () => {
    showConfetti()

    setTimeout(() => {
      hideConfetti()
    }, 7000)
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading && <Loading onAnimationEnd={handleProgressAnimation} />}

      {!isLoading && (
        <div className="flex flex-col items-center gap-2">
          <strong className="text-3xl text-white">Parabéns!</strong>
          <p className="text-[#a9a9b2] text-base">
            Conseguimos cadastrar seu time no campeonato
          </p>
        </div>
      )}

      {Confetti && <Confetti />}
    </div>
  )
}
