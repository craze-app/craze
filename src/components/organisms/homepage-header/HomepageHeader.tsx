import { ipcRenderer } from 'electron'

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IconPinned } from '@tabler/icons'
import cn from 'classnames'

import styles from './HomepageHeader.module.scss'

const HomepageHeader = () => {
  const history = useHistory()
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState<boolean>(false)

  const onUpdateAlwaysOnTop = (event: unknown, status: boolean) => {
    setIsAlwaysOnTop(status)
  }

  useEffect(() => {
    ipcRenderer.on('on-update-always-on-top', onUpdateAlwaysOnTop)
    return () => {
      ipcRenderer.off('on-update-always-on-top', onUpdateAlwaysOnTop)
    }
  }, [])

  const onDoubleClick = () => {
    ipcRenderer.send('toggle-maximize')
  }

  const toggleAlwaysOnTop = () => {
    ipcRenderer.send('toggle-always-on-top')
  }

  return (
    <div className={cn(styles.header, 'draggable-area')} onDoubleClick={onDoubleClick}>
      <div className={cn(styles.buttons, styles.leftButtons)}></div>
      <div className={styles.featureName}>Craze App</div>
      <div className={cn(styles.buttons, styles.rightButtons)}>
        <button className={cn(isAlwaysOnTop && styles.active)} onClick={toggleAlwaysOnTop}>
          <IconPinned size={18} />
        </button>
      </div>
    </div>
  )
}

export default HomepageHeader
