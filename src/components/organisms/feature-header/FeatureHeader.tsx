import { ipcRenderer } from 'electron'

import { useState } from 'react'

import { IconHeart, IconLayoutColumns, IconPinned } from '@tabler/icons'
import cn from 'classnames'

import { Feature } from '../../../features'
import { useFavouriteFeaturesStore } from '../../../stores/FavouriteFeaturesStore'
import styles from './FeatureHeader.module.scss'

type FeatureHeaderProps = {
  feature: Feature
}

const FeatureHeader = (props: FeatureHeaderProps) => {
  const [isPinned, setIsPinned] = useState<boolean>(false)

  const { isFavouriteFeature, favouriteFeatures, toggleFavouriteFeature } =
    useFavouriteFeaturesStore()
  const isFavourite = isFavouriteFeature(props.feature.id)

  const onDoubleClick = () => {
    ipcRenderer.send('toggle-maximize')
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
          className={cn(styles.favouriteButton, isFavourite && styles.favouriteButtonActive)}
          onClick={() => toggleFavouriteFeature(props.feature.id)}
          title={'Favourite/unfavourite'}>
          <IconHeart size={16} />
        </button>
      </div>
      <div className={cn(styles.buttons, styles.rightButtons)}>
        <button className={cn(isPinned && styles.active)} onClick={() => setIsPinned((s) => !s)}>
          <IconPinned size={18} />
        </button>
      </div>
    </div>
  )
}

export default FeatureHeader
