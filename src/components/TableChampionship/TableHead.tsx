export function TableHead() {
  return (
    <thead className="border-b border-b-[#323238]">
      <tr className="h-8">
        <th className="pl-4 text-left text-xs text-[#a9a9b2]">Clube</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">Pts</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">Pj</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">Vit</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">E</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">DER</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">Gm</th>
        <th className="uppercase text-center text-[#a9a9b2] text-xs">Gs</th>
        <th className="pr-1 uppercase text-center text-[#a9a9b2] text-xs">
          sg
        </th>

        <th className="pr-1 w-[110px] uppercase text-center text-[#a9a9b2] text-xs">
          Últimas 5
        </th>
      </tr>
    </thead>
  )
}
