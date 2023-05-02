import { useState } from 'react'

export function useHeaderTabs<T>(tabs: T[]) {
  const [tabActive, setTabActive] = useState(tabs[0])

  const totalTabs = tabs.length

  function handleChangeTabActive(tabIndex: number) {
    setTabActive(tabs[tabIndex])
  }

  return {
    tabActive,
    totalTabs,
    handleChangeTabActive,
  }
}
