import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { generateDatesFromMonth } from '@/utils/generate-dates'
import { DatePickerDay } from './Day'

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

interface DatePickerProps {
  onSelectDateCalendar: (date: string) => void
}

export function DatePicker({ onSelectDateCalendar }: DatePickerProps) {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month())

  const [datePickerMonth, setDatePickerMonth] = useState(
    months[dayjs().month()],
  )

  const [daysDatePicker, setDaysDatePicker] = useState<number[]>([])

  const [dayDatePicker, setDayDatePicker] = useState<number | null>(null)

  const today = dayjs()

  const currentMonth = today.month()

  const datePickerYear = today.year()

  const lastDayOfYear = today.endOf('year')
  const lastMonthOfYear = lastDayOfYear.month()

  function handleSelectDay(day: number) {
    setDayDatePicker(day)

    const dateToCheck = today.year(datePickerYear).month(monthIndex).date(day)

    let date = ''

    if (dateToCheck.month() === monthIndex) {
      date = dateToCheck.format('YYYY-MM-DD')

      onSelectDateCalendar(date)
    }
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
    const { daysOfMonth: days } = generateDatesFromMonth(monthIndex)

    setDaysDatePicker(days)
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
            {daysDatePicker.map((day, index) => {
              const today = dayjs()

              const month = dayjs().month()

              const dayDatePickerEmpty = !dayDatePicker
              const currentDay = day === today.date() && month === monthIndex
              const dayDatePickerSelected = day === dayDatePicker

              const dayActive = dayDatePickerEmpty
                ? currentDay
                : dayDatePickerSelected

              const dayOfWeekIndex = dayjs().month(monthIndex).date(day).day()
              const key = `${monthIndex}-${index}`

              return (
                <DatePickerDay
                  key={key}
                  day={day}
                  animationDelay={index}
                  dayIsSelected={dayActive}
                  onClick={() => handleSelectDay(day)}
                  style={{
                    gridColumnStart: index === 0 ? dayOfWeekIndex + 1 : '',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
