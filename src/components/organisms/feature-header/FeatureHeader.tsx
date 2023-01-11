import { ipcRenderer } from 'electron'

import { useEffect, useState } from 'react'

import { IconHeart, IconLayoutColumns, IconPinned } from '@tabler/icons'
import cn from 'classnames'

import { Feature } from '../../../features'
import styles from './FeatureHeader.module.scss'

type FeatureHeaderProps = {
  feature: Feature
}

const getAlwaysOnTopValue = () => {}

const FeatureHeader = (props: FeatureHeaderProps) => {
  const [isFavoriteFeature, setIsFavoriteFeature] = useState<boolean>(false)
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
      <div className={cn(styles.buttons, styles.leftButtons)}>
        <button>
          <IconLayoutColumns size={18} />
        </button>
      </div>
      <div className={styles.featureName}>
        {props.feature.title}
        <button
          className={cn(styles.favoriteButton, isFavoriteFeature && styles.favoriteButtonActive)}
          onClick={() => setIsFavoriteFeature((s) => !s)}
          title={'Favorite/unfavorite'}>
          <IconHeart size={16} />
        </button>
      </div>
      <div className={cn(styles.buttons, styles.rightButtons)}>
        <button className={cn(isAlwaysOnTop && styles.active)} onClick={toggleAlwaysOnTop}>
          <IconPinned size={18} />
        </button>
      </div>
    </div>
  )
}

export default FeatureHeader
