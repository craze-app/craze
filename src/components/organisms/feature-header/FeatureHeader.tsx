import { useState } from 'react'

import { IconHeart, IconLayoutColumns, IconPinned } from '@tabler/icons'
import cn from 'classnames'

import { Feature } from '../../../features'
import styles from './FeatureHeader.module.scss'

type FeatureHeaderProps = {
  feature: Feature
}

const FeatureHeader = (props: FeatureHeaderProps) => {
  const [isFavoriteFeature, setIsFavoriteFeature] = useState<boolean>(false)
  const [isPinned, setIsPinned] = useState<boolean>(false)
  return (
    <div className={cn(styles.header, 'draggable-area')}>
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
        <button className={cn(isPinned && styles.active)} onClick={() => setIsPinned((s) => !s)}>
          <IconPinned size={18} />
        </button>
      </div>
    </div>
  )
}

export default FeatureHeader
