import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

  const [dayDatePicker, setDayDatePicker] = useState<number | null>(null)

  const today = dayjs()

  const currentMonth = today.month()

  const datePickerYear = today.year()

  const lastDayOfYear = today.endOf('year')
  const lastMonthOfYear = lastDayOfYear.month()

  function handleSelectDay(day: number) {
    setDayDatePicker(day)

    const check = today.month(monthIndex).date(day)

    let confrotantionDate = ''

    if (check.month() === monthIndex) {
      const formattedMonth = check.format('MM')
      const formattedDayMonth = check.format('DD')
      const dayOfWeek = check.format('dddd')

      confrotantionDate = `${dayOfWeek} ${formattedDayMonth}/${formattedMonth}`
    }

    console.log(confrotantionDate)
  }

  function clearSelectDay() {
    setDayDatePicker(null)
  }

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

    clearSelectDay()
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
            <motion.span
              key={monthIndex}
              className="text-white font-medium text-sm sm:text-base"
              initial={{ opacity: 0, translateY: -5 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.1 }}
            >
              {datePickerMonth}
            </motion.span>
            <span className="text-[#a9a9b2] text-sm sm:text-base">
              {datePickerYear}
            </span>
          </div>

          <div className="flex items-center gap-2" id="controllers">
            <button
              type="button"
              className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-md hover:bg-[#323238] disabled:cursor-not-allowed"
              onClick={handlePreviousMonth}
              disabled={monthIndex === currentMonth}
            >
              <CaretLeft size={20} color="#a9a9b2" />
            </button>

            <button
              type="button"
              className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-md hover:bg-[#323238] disabled:cursor-not-allowed"
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
                  className="block text-[#A9A9B2] text-sm sm:text-base text-center font-medium uppercase"
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

            {daysDatePicker.map((day, index) => {
              const today = dayjs().date()

              const dayDatePickerEmpty = !dayDatePicker
              const month = dayjs().month()

              const dayActive = day === today && month === monthIndex

              const dayDatePickerSelected = day === dayDatePicker

              return (
                <motion.div
                  key={`${monthIndex}-${index}`}
                  onClick={() => handleSelectDay(day)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeIn', delay: index * 0.1 }}
                  className={cx(
                    'cursor-pointer flex justify-center items-center h-8 sm:h-[58px] sm:w-auto rounded-md hover:bg-[#323238] transition-colors',
                    {
                      'bg-[#323238]': dayDatePickerEmpty
                        ? dayActive
                        : dayDatePickerSelected,
                    },
                  )}
                >
                  <span className="text-white text-sm sm:text-base">{day}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
