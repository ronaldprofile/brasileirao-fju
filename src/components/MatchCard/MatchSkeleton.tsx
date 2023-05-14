import Skeleton from 'react-loading-skeleton'

export function MatchCardSkeleton() {
  return (
    <div className="sm:h-32 px-6 py-4 bg-[#202024] border border-[#323238] flex flex-col gap-4 sm:items-center sm:flex-row sm:justify-between cursor-pointer hover:bg-[#323238]/60 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Skeleton circle width={24} height={24} />
          <Skeleton width={100} height={22} />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton circle width={24} height={24} />
          <Skeleton width={100} height={22} />
        </div>
      </div>

      <div className="h-full pt-3 sm:pl-4 flex flex-col items-center justify-center border-t-[1.2px] border-t-[#323238] sm:border-t-0 sm:border-l-[1.2px] border-l-[#323238]">
        <Skeleton width={40} />
        <Skeleton width={30} />
      </div>
    </div>
  )
}
