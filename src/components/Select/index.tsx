import Select, { components, Props } from 'react-select'

interface IOption {
  value: string
  label: string
  image: string
}

interface CustomSelectProps extends Props {
  options: IOption[]
}

const Option = (props: any) => (
  <components.Option
    {...props}
    className="bg-[#202024] hover:bg-[#323238] cursor-pointer"
  >
    <div className="flex items-center gap-3 text-[#a9a9b2]">
      <img src={props.data.image} alt={props.data.label} className="w-6" />

      <span className="text-sm">{props.data.label}</span>
    </div>
  </components.Option>
)

export function CustomSelect({ options, ...rest }: CustomSelectProps) {
  return (
    <Select
      {...rest}
      options={options}
      components={{ Option }}
      isSearchable={false}
      classNames={{
        control: ({ isFocused }) =>
          isFocused ? 'border-[#323238] bg-[#202024]' : '',
      }}
    />
  )
}
