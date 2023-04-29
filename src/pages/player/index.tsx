import { useState } from 'react'
import { Button } from '@/components/Button'
import { FormBox } from '@/components/FormBox'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'

import { CircleNotch, FileImage } from '@phosphor-icons/react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  createPlayerFormSchema,
  createPlayerFormData,
  createPlayerFormDataInputs,
} from '@/schemas/player'

import { PlayerPhotoPreview } from '@/components/PlayerPhotoPreview'

export default function Player() {
  const [delay, setDelay] = useState(false)

  const { register, watch, resetField, handleSubmit, formState } =
    useForm<createPlayerFormData>({
      resolver: zodResolver(createPlayerFormSchema),
    })

  const { errors } = formState

  async function handleCreatePlayer(data: createPlayerFormDataInputs) {
    setDelay(true)

    setTimeout(() => {
      console.log('Enviando dados do formulário:', data)
      setDelay(false)
    }, 2000)
  }

  function handleRemovePhotoSelected() {
    resetField('avatar')
  }

  const watchUploadFile: FileList = watch('avatar')
  const havePhotoSelected = watchUploadFile?.length > 0

  return (
    <div className="h-full w-full">
      <div className="h-full flex justify-center items-center">
        <div className="w-full p-6 sm:max-w-xl sm:p-0">
          <FormBox>
            <form
              onSubmit={handleSubmit(handleCreatePlayer)}
              className="w-full mt-8"
            >
              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="name">
                  Nome
                </label>

                <Input
                  type="text"
                  id="name"
                  className="w-full"
                  placeholder="Neymar Júnior"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="surname">
                  Apelido
                </label>

                <Input
                  type="text"
                  id="surname"
                  className="w-full"
                  placeholder="Menino Ney"
                  {...register('surname')}
                  error={errors.surname?.message}
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-[#E1E1E6] text-sm" htmlFor="shirt">
                  Camisa
                </label>

                <Input
                  type="text"
                  id="shirt"
                  className="w-full appearance-none"
                  placeholder="10"
                  {...register('shirt')}
                  error={errors.shirt?.message}
                />
              </div>

              <div className="mb-4 flex flex-col gap-2">
                {havePhotoSelected ? (
                  <PlayerPhotoPreview
                    files={watchUploadFile}
                    onRemovePhotoSelected={handleRemovePhotoSelected}
                  />
                ) : (
                  <>
                    <label htmlFor="avatar">
                      <span className="text-[#E1E1E6] text-sm">Foto</span>

                      <div className="mt-2 p-4 flex flex-col gap-3 items-center cursor-pointer text-[#7C7C8A] border-2 border-[#323238] border-dashed rounded-md">
                        <div className="h-10 w-10 flex justify-center items-center bg-[#323238] rounded-full">
                          <FileImage size={20} />
                        </div>

                        <span className="text-sm">Escolher imagem</span>
                      </div>
                    </label>

                    <Input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      {...register('avatar')}
                      className="opacity-0 invisible absolute inset-0"
                    />
                  </>
                )}

                {errors.avatar && (
                  <span className="text-xs text-red-400">
                    {errors.avatar.message?.toString()}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={delay}
                className="w-full font-bold flex justify-center items-center"
              >
                {delay ? (
                  <CircleNotch size={20} className="animate-spin" />
                ) : (
                  'Salvar'
                )}
              </Button>
            </form>
          </FormBox>
        </div>
      </div>
    </div>
  )
}
