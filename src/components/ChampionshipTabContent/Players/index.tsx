import { Shield } from '@phosphor-icons/react'

export function Players() {
  return (
    <div className="bg-[#202024]">
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 px-2 pt-2 pb-10">
        {Array.from({ length: 25 }).map((item, index) => {
          return (
            <div key={index} className="border border-[#323238] rounded-md">
              <img
                className="w-full rounded-t"
                src="https://github.com/ronaldprofile.png"
                alt=""
              />

              <div className="p-2 flex flex-col gap-1 text-[#a9a9b2]">
                <span className="text-sm">Ronald Tomaz</span>

                <span className="flex items-center gap-2 text-xs">
                  <Shield size={16} />
                  FJU
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
