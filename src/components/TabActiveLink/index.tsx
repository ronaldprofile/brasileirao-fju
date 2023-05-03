import { ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import cx from 'clsx'

import styles from './style.module.css'

interface TabActiveLinkProps extends LinkProps {
  children?: ReactElement
  className?: string
  content?: string
  shouldMatchExactLink?: boolean
}

export function TabActiveLink({
  children,
  className,
  content,
  shouldMatchExactLink = true,
  ...restProps
}: TabActiveLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  if (
    shouldMatchExactLink &&
    (asPath === restProps.href || asPath === restProps.as)
  ) {
    isActive = true
  }

  if (
    !shouldMatchExactLink &&
    (asPath.startsWith(String(restProps.href)) ||
      asPath.endsWith(String(restProps.as)))
  ) {
    isActive = true
  }

  return (
    <Link
      {...restProps}
      className={cx(styles.tab, isActive && styles['tab-active'])}
    >
      {children}
    </Link>
  )
}
