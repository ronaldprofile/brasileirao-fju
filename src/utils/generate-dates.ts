import dayjs from 'dayjs'

export function generateDatesFromMonth(monthIndex: number) {
  const today = dayjs()

  const month = today.month(monthIndex)
  const daysInMonth = month.daysInMonth()

  const dayOfMonth = month.month(monthIndex).date() // 1 - 31

  const startDay = today.month() === monthIndex ? dayOfMonth : 1
  const daysFromMonthStart = daysInMonth - (startDay - 1)

  const daysOfMonth = Array.from(
    { length: daysFromMonthStart },
    (_, i) => i + startDay,
  )

  return { daysOfMonth }
}
