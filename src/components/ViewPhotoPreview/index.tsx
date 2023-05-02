import { useState } from 'react'
import cx from 'clsx'

import { Modal as ModalComponent, ModalWrapper } from '../Modal'

import { Eye, Image as ImageIcon, Trash } from '@phosphor-icons/react'
import { Palette } from 'react-palette'
import { useFormContext } from 'react-hook-form'
import { createTeamFormData } from '@/schemas/team'
import { formatFileNameToShort } from '@/utils/format-filename'

interface ViewPhotoPreviewProps {
  onRemovePhotoSelected: () => void
  imagePhotoPreview: string

  fileInfo: File
}

export function ViewPhotoPreview({
  fileInfo,
  imagePhotoPreview,
  onRemovePhotoSelected,
}: ViewPhotoPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [teamColorHighlight, setTeamColorHighlight] = useState<string>()

  const { register, setValue } = useFormContext<createTeamFormData>()

  function handleViewImage() {
    openModal()
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function handleSelectColorHighlight(color: string) {
    setTeamColorHighlight(color)
    setValue('teamColorHighlight', color)
  }

  const fileName = formatFileNameToShort(fileInfo.name)
  const fileSizeKB = Number(fileInfo.size / 1024).toFixed(2) + ' KB'

  return (
    <>
      <div className="p-4 flex justify-between rounded-md border border-[#323238]">
        <div className="flex items-start gap-6">
          <div className="flex justify-center items-center h-10 w-10 bg-[#323238] rounded-full">
            <ImageIcon size={20} className="text-[#00875f]" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#7c7c7a]">
              {fileName}
            </span>
            <span className="text-sm text-[#7c7c7a]">{fileSizeKB}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleViewImage}
            title="Ver imagem"
            className="p-3 rounded-full bg-transparent text-sm text-[#7c7c7a] border border-[#323238] hover:text-white transition-colors"
          >
            <Eye size={20} />
          </button>

          <button
            type="button"
            onClick={onRemovePhotoSelected}
            title="Remover imagem"
            className="p-3 rounded-full bg-transparent text-sm text-[#7c7c7a] border border-[#323238] hover:text-white transition-colors"
          >
            <Trash size={20} />
          </button>
        </div>

        <ModalComponent open={modalOpen} onOpenChange={closeModal}>
          <ModalWrapper>
            <div className="flex justify-center items-center">
              <img
                src={imagePhotoPreview}
                alt={fileInfo.name}
                className="w-40 h-40 object-cover"
              />
            </div>
          </ModalWrapper>
        </ModalComponent>
      </div>

      {imagePhotoPreview && (
        <div className="my-3">
          <span className="text-sm text-[#7c7c7a]">
            Baseado na sua imagem, escolha uma cor de destaque
          </span>

          <Palette src={imagePhotoPreview}>
            {({ data, loading, error }) => {
              if (error) return <div>Error to load colors: {error.message}</div>
              if (loading) return <div>loading colors</div>

              return (
                <div className="py-3 flex items-center gap-2">
                  {Object.keys(data).map((keyColor, index) => {
                    const color = data[keyColor]

                    const teamColorHighlightIsSelected =
                      teamColorHighlight === color

                    return (
                      <div
                        key={`${color && color + index}`}
                        onClick={() => handleSelectColorHighlight(color ?? '')}
                        className={cx(
                          'p-1 border-2 rounded-full cursor-pointer transition-transform duration-300 hover:-translate-y-2',
                          {
                            'border-transparent opacity-80 hover:opacity-100':
                              !teamColorHighlightIsSelected,
                            'border-[#00875F] cursor-not-allowed':
                              teamColorHighlightIsSelected,
                          },
                        )}
                      >
                        <div
                          className={cx(
                            'w-8 h-8  flex items-center justify-center rounded-full',
                          )}
                          style={{
                            backgroundColor: color,
                          }}
                        >
                          <input
                            type="radio"
                            className="w-full h-full opacity-0 invisible"
                            value={color}
                            {...register('teamColorHighlight')}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }}
          </Palette>
        </div>
      )}
    </>
  )
}
