import { ipcRenderer } from 'electron'

import { useEffect, useState } from 'react'

import { IconHeart, IconLayoutColumns, IconPinned } from '@tabler/icons'
import cn from 'classnames'

import { Feature } from '../../../features'
import { useFavouriteFeaturesStore } from '../../../stores/FavouriteFeaturesStore'
import styles from './FeatureHeader.module.scss'

type FeatureHeaderProps = {
  feature: Feature
}

const FeatureHeader = (props: FeatureHeaderProps) => {
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

  const { isFavouriteFeature, toggleFavouriteFeature } = useFavouriteFeaturesStore()
  const isFavourite = isFavouriteFeature(props.feature.id)

  const onDoubleClick = () => {
    ipcRenderer.send('toggle-maximize')
  }

  const toggleAlwaysOnTop = () => {
    ipcRenderer.send('toggle-always-on-top')
  }

  return (
    <div className={cn(styles.header, 'draggable-area')} onDoubleClick={onDoubleClick}>
      <div className={styles.featureName}>
        {props.feature.title}
        <button
          className={cn(styles.favouriteButton, isFavourite && styles.favouriteButtonActive)}
          onClick={() => toggleFavouriteFeature(props.feature.id)}
          title={'Favourite/unfavourite'}>
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
