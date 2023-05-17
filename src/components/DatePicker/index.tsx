import { useEffect, useState } from 'react'
import cx from 'clsx'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { generateDatesFromMonth } from '@/utils/generate-dates'

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function DatePicker() {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())

  const [datePickerMonth, setDatePickerMonth] = useState(
    months[dayjs().month()],
  )

  const [daysDatePicker, setDaysDatePicker] = useState<number[]>([])
  const [daysEmptyDatePicker, setDaysEmptyDatePicker] = useState<null[]>([])

  const today = dayjs()

  const currentMonth = today.month()

  const datePickerYear = today.year()

  const lastDayOfYear = today.endOf('year')
  const lastMonthOfYear = lastDayOfYear.month()

  const handleNextMonth = () => {
    if (monthIndex <= lastMonthOfYear) {
      setMonthIndex((prevState) => prevState + 1)
    }
  }

  const handlePreviousMonth = () => {
    if (monthIndex > currentMonth) {
      setMonthIndex((prevState) => prevState - 1)

      const previousMonth = monthIndex
      const month = months[previousMonth]

      setDatePickerMonth(month)
    }
  }

  useEffect(() => {
    const updatedMonth = months[monthIndex]
    setDatePickerMonth(updatedMonth)
  }, [monthIndex])

  useEffect(() => {
    const { daysOfMonth: days, emptyDays } = generateDatesFromMonth(monthIndex)

    setDaysDatePicker(days)
    setDaysEmptyDatePicker(emptyDays)
  }, [currentMonth, monthIndex])

  return (
    <div className="w-full p-6 border border-[#323238] rounded-md bg-[#202024]">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-white font-medium">{datePickerMonth}</span>
            <span className="text-[#a9a9b2]">{datePickerYear}</span>
          </div>

          <div className="flex items-center gap-2" id="controllers">
            <button
              className="w-10 h-10 flex justify-center items-center rounded-md hover:bg-[#323238] disabled:cursor-not-allowed"
              onClick={handlePreviousMonth}
              disabled={monthIndex === currentMonth}
            >
              <CaretLeft size={20} color="#a9a9b2" />
            </button>

            <button
              className="w-10 h-10 flex justify-center items-center rounded-md hover:bg-[#323238] disabled:cursor-not-allowed"
              onClick={handleNextMonth}
              disabled={monthIndex === 11}
            >
              <CaretRight size={20} color="#a9a9b2" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-7 grid-flow-row gap-3">
            {weekDays.map((day) => {
              return (
                <span
                  className="text-[#A9A9B2] text-center font-medium uppercase"
                  key={day}
                >
                  {day}
                </span>
              )
            })}
          </div>

          <div className="mt-1 grid grid-cols-7 grid-flow-row gap-3">
            {daysEmptyDatePicker.map((day) => (
              <div key={day}></div>
            ))}

            {daysDatePicker.map((day) => {
              const today = dayjs().date()

              const dayActive = day === today && dayjs().month() === monthIndex

              return (
                <div
                  key={day}
                  className={cx(
                    'cursor-pointer flex justify-center items-center h-[58px] rounded-md hover:bg-[#323238] transition-colors',
                    {
                      'bg-[#323238]': dayActive,
                    },
                  )}
                >
                  <span className="text-white">{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
