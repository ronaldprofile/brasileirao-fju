import { useState } from 'react'
import { Modal as ModalComponent, ModalWrapper } from '../Modal'

import { Eye, Image as ImageIcon, Trash } from '@phosphor-icons/react'
import { formatFileNameToShort } from '@/utils/format-file-name'

interface ViewPhotoPreviewProps {
  onRemovePhotoSelected: () => void

  files: FileList
}

export function ViewPhotoPreview({
  files,
  onRemovePhotoSelected,
}: ViewPhotoPreviewProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [imagePhotoPreview, setImagePhotoPreview] = useState('')

  function handleViewImage() {
    handleGenerateImagePreview()

    openModal()
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function handleGenerateImagePreview() {
    if (files.length > 0) {
      const file = files[0]

      const imagePreviewURL = URL.createObjectURL(file)

      setImagePhotoPreview(imagePreviewURL)
    }
  }

  const file = files[0]

  const fileName = formatFileNameToShort(file.name)
  const fileSizeKB = Number(file.size / 1024).toFixed(2) + ' KB'

  return (
    <div className="p-4 flex justify-between rounded-md border border-[#323238]">
      <div className="flex items-start gap-6">
        <div className="flex justify-center items-center h-10 w-10 bg-[#323238] rounded-full">
          <ImageIcon size={20} className="text-[#00875f]" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#7c7c7a]">{fileName}</span>
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
              alt=""
              className="w-40 h-40 object-cover"
            />
          </div>
        </ModalWrapper>
      </ModalComponent>
    </div>
  )
}
