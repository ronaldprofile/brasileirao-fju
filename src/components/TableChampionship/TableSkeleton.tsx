import Skeleton from 'react-loading-skeleton'

interface TableSkeletonProps {
  count?: number
}

export function TableSkeleton({ count = 10 }: TableSkeletonProps) {
  return (
    <table className="w-full mt-2 bg-[#202024]">
      <div className="px-4 py-2 border-b border-b-[#323238]">
        <div className="flex items-center justify-between">
          <Skeleton height={20} width={80} />
          <Skeleton height={20} width={300} />
        </div>
      </div>

      <div className="divide-y divide-[#323238]">
        {Array.from({ length: count }).map((_, index) => {
          return (
            <div key={index} className="w-full py-2 px-4 h-10">
              <Skeleton height={20} />
            </div>
          )
        })}
      </div>
    </table>
  )
}
