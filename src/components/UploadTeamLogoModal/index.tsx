import React, { useState } from 'react'
import cx from 'clsx'

import {
  Modal as ModalComponent,
  ModalWrapper,
  ModalTitle,
  ModalProps,
} from '../Modal'

import Image from 'next/image'

import imageManUnited from '../../assets/images/man-united.svg'
import imageRealMadrid from '../../assets/images/real-madrid.svg'
import imageFortaleza from '../../assets/images/fortaleza.svg'
import imageCeara from '../../assets/images/ceara.svg'

import { Button } from '../Button'
import { useRouter } from 'next/router'

interface UploadTeamLogoModalProps extends ModalProps {}

interface Team {
  id: number
  teamName: string
  imageUrl: string
}

const teamsOptions = [
  {
    id: 1,
    teamName: 'Manchester United',
    imageUrl: imageManUnited,
  },
  {
    id: 4,
    teamName: 'Ceará',
    imageUrl: imageCeara,
  },
  {
    id: 2,
    teamName: 'Real Madrid',
    imageUrl: imageRealMadrid,
  },
  {
    id: 3,
    teamName: 'Fortaleza',
    imageUrl: imageFortaleza,
  },
]

export function UploadTeamLogoModal({
  open,
  onOpenChange,
}: UploadTeamLogoModalProps) {
  const [teamLogoSelected, setTeamLogoSelected] = useState<Team | null>(null)

  const router = useRouter()

  function handleSelectTeamLogo(team: Team) {
    setTeamLogoSelected(team)
  }

  function handleSaveTeamLogo() {
    router.push('/success')
  }

  const buttonDisabled = !teamLogoSelected

  return (
    <ModalComponent open={open} onOpenChange={onOpenChange}>
      <ModalWrapper>
        <ModalTitle>Logo do time</ModalTitle>

        <div className="mt-8">
          {/* <Input
            type="file"
            accept="image/*"
            id="team_logo"
            className="opacity-0 invisible absolute inset-0"
          /> */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teamsOptions.map((team) => {
              const whichTeamLogoSelected = teamLogoSelected?.id === team.id

              return (
                <div
                  key={team.id}
                  onClick={() => handleSelectTeamLogo(team)}
                  className={cx(
                    'p-3 flex justify-center items-center border cursor-pointer rounded-md  transition-all',
                    {
                      'border-[#323238]': !whichTeamLogoSelected,
                      'border-[#00875F]': whichTeamLogoSelected,
                    },
                  )}
                >
                  <Image
                    src={team.imageUrl}
                    alt=""
                    className={cx('aspect-video contrast-50 transition-all', {
                      'contrast-100': whichTeamLogoSelected,
                    })}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            {/* <label htmlFor="team_logo">
              <span className="h-12 w-[150px] px-3 cursor-pointer flex justify-center items-center bg-transparent border-2 border-[#00875F] font-medium text-sm text-white rounded-md focus:outline-none hover:bg-[#00875F] transition-colors">
                Escolher imagem
              </span>
            </label> */}

            <Button disabled={buttonDisabled} onClick={handleSaveTeamLogo}>
              Ok, escolhi o escudo
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </ModalComponent>
  )
}
