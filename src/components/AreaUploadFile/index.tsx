import { useCallback, useEffect, useState } from 'react'
import { FileImage } from '@phosphor-icons/react'
import { Input } from '../Input'

import { useFormContext } from 'react-hook-form'

import { createTeamFormData } from '@/schemas/team'
import { ViewPhotoPreview } from '../ViewPhotoPreview'

interface AreaUploadFileProps {
  title: string
  label: keyof createTeamFormData
}

export function AreaUploadFile({ label, title }: AreaUploadFileProps) {
  const [imagePhotoPreview, setImagePhotoPreview] = useState('')

  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext<createTeamFormData>()

  function handleRemovePhotoSelected() {
    resetField(label)
  }

  const files: FileList = watch(label)
  const havePhotoSelected = files?.length > 0

  const handleGenerateImagePreview = useCallback(() => {
    if (havePhotoSelected) {
      const file = files[0]

      const imagePreviewURL = URL.createObjectURL(file)

      setImagePhotoPreview(imagePreviewURL)
    }
  }, [files, havePhotoSelected])

  useEffect(() => {
    handleGenerateImagePreview()
  }, [files, handleGenerateImagePreview])

  return (
    <div className="w-full group">
      {havePhotoSelected ? (
        <ViewPhotoPreview
          fileInfo={files[0]}
          imagePhotoPreview={imagePhotoPreview}
          onRemovePhotoSelected={handleRemovePhotoSelected}
        />
      ) : (
        <>
          <label htmlFor={label}>
            <span className="text-[#E1E1E6] text-sm">{title}</span>

            <div className="mt-2 p-4 flex flex-col gap-3 items-center cursor-pointer text-[#7C7C8A] border-2 border-[#323238] border-dashed rounded-md group-hover:border-[#00875F] transition-colors">
              <div className="h-10 w-10 flex justify-center items-center bg-[#323238] rounded-full">
                <FileImage size={20} />
              </div>

              <span className="text-sm">Escolher imagem</span>
            </div>
          </label>

          <Input
            type="file"
            accept="image/*"
            id={label}
            {...register(label)}
            className="opacity-0 invisible absolute inset-0"
          />

          {errors.shield && (
            <span className="text-xs text-[#D92D20]">
              {errors.shield.message?.toString()}
            </span>
          )}
        </>
      )}
    </div>
  )
}
