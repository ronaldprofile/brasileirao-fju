import { HTMLMotionProps, motion } from 'framer-motion'
import cx from 'clsx'

interface DatePickerDayProps extends HTMLMotionProps<'div'> {
  day: number
  animationDelay: number
  dayIsSelected: boolean
}

export function DatePickerDay({
  day,
  animationDelay,
  dayIsSelected,
  ...rest
}: DatePickerDayProps) {
  const dayActive = dayIsSelected

  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeIn', delay: animationDelay * 0.1 }}
      className={cx(
        'cursor-pointer flex justify-center items-center h-8 sm:h-[58px] sm:w-auto rounded-md hover:bg-[#323238] transition-colors',
        dayActive && 'bg-[#323238]',
      )}
    >
      <span className="text-white text-sm sm:text-base">{day}</span>
    </motion.div>
  )
}
