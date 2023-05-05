import Skeleton from 'react-loading-skeleton'

export function PlayerSkeleton() {
  return (
    <div className="h-full flex flex-col border border-[#323238] rounded-md cursor-pointer group">
      <Skeleton height={100} />

      <div className="p-2 flex flex-1 flex-col justify-end gap-1 text-[#a9a9b2]">
        <Skeleton width={80} />

        <span className="flex items-center gap-1 text-xs">
          <Skeleton width={24} height={24} />

          <Skeleton width={50} />
        </span>
      </div>
    </div>
  )
}
