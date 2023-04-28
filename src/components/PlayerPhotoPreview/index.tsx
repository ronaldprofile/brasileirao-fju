import { Image as ImageIcon } from '@phosphor-icons/react'

interface PlayerPhotoPreviewProps {
  avatar: {
    name: string
    size: number
  }
}

export function PlayerPhotoPreview({
  avatar: { name, size },
}: PlayerPhotoPreviewProps) {
  return (
    <div className="p-4 flex justify-between rounded-md border border-[#323238]">
      <div className="flex items-start gap-6">
        <div className="flex justify-center items-center h-10 w-10 bg-[#323238] rounded-full">
          <ImageIcon size={20} className="text-[#00875f]" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#7c7c7a]">{name}</span>
          <span className="text-sm text-[#7c7c7a]">{size} KB</span>
        </div>
      </div>

      <button
        type="button"
        className="p-3 bg-transparent text-sm text-[#7c7c7a] border border-[#323238] rounded-md hover:text-white transition-colors"
      >
        ver imagem
      </button>
    </div>
  )
}
