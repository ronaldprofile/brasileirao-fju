import { animated, useSpring } from '@react-spring/web'
import cx from 'clsx'

interface LoadingProps {
  progressColor?: string
  onAnimationEnd?: () => void
}

export function Loading({
  progressColor = '#00875F',
  onAnimationEnd,
}: LoadingProps) {
  const [springs] = useSpring(() => ({
    from: { width: '0%' },
    to: { width: '100%' },
    config: { duration: 3000 },
    onRest: onAnimationEnd,
  }))

  return (
    <animated.div className="w-64 bg-[#323238] rounded-full h-2.5">
      <animated.div
        className={cx('h-2.5 rounded-full', `bg-[${progressColor}]`)}
        style={{
          ...springs,
        }}
      />
    </animated.div>
  )
}
