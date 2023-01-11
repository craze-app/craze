import React, { useEffect, useState } from 'react'

import Sidebar from '../components/partials/sidebar/Sidebar'
import useWindowFocus from '../hooks/utils/useWindowFocus'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarBackground, setSidebarBackground] = useState('transparent')
  const { isFocused } = useWindowFocus()

  useEffect(() => {
    if (process.platform !== 'darwin') {
      setSidebarBackground('#202932')
      return
    }
    if (isFocused) {
      setSidebarBackground('transparent')
    } else {
      setSidebarBackground('#202932')
    }
  }, [isFocused])

  return (
    <div className="main-layout">
      <Sidebar backgroundColor={sidebarBackground} />
      <div className="main-layout-content">{children}</div>
    </div>
  )
}

export default MainLayout
