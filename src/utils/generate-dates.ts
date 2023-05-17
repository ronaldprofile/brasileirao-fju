import dayjs from 'dayjs'

export const monthsOfYear = [
  0, // 'Janeiro',
  1, // 'Fevereiro',
  2, // 'Março',
  3, // 'Abril',
  4, // 'Maio',
  5, // 'Junho',
  6, // 'Julho',
  7, // 'Agosto',
  8, // 'Setembro',
  9, // 'Outubro',
  10, // 'Novembro',
  11, // 'Dezembro',
]

export function generateDatesFromMonth(monthIndex: number) {
  const today = dayjs()

  const month = today.month(monthIndex)
  const daysInMonth = month.daysInMonth()

  const dayOfMonth = month.date() // 1 - 31
  const daysFromMonthStart = daysInMonth - (dayOfMonth - 1)

  const daysOfMonth = Array.from(
    { length: daysFromMonthStart },
    (_, i) => i + dayOfMonth,
  )

  const startOfMonth = today.startOf('month').day()

  const emptyDays = Array.from(
    { length: startOfMonth + startOfMonth },
    () => null,
  )

  return { daysOfMonth, emptyDays }
}
