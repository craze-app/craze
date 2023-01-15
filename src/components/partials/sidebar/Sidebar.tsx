import { ipcRenderer } from 'electron'

import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { IconHeart } from '@tabler/icons'
import cn from 'classnames'
import Fuse from 'fuse.js'
import lodash from 'lodash'

import { Feature, features } from '../../../features'
import { useFavouriteFeaturesStore } from '../../../stores/FavouriteFeaturesStore'
import styles from './Sidebar.module.scss'

const fuseOptions = {
  keys: ['title', 'id'],
}

type SidebarProps = {
  backgroundColor: string
}

type SidebarItemWithFavouriteStatus = Feature & {
  index: number
  isFavourite: boolean
}

const Sidebar = (props: SidebarProps) => {
  const { isFavouriteFeature, favouriteFeatures } = useFavouriteFeaturesStore()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const featuresList: SidebarItemWithFavouriteStatus[] = useMemo(() => {
    const list = features.map((feature, index) => ({
      ...feature,
      index,
      isFavourite: isFavouriteFeature(feature.id),
    }))
    return lodash.orderBy(list, ['isFavourite', 'index'], ['desc', 'asc'])
  }, [features, favouriteFeatures])

  console.log(featuresList)

  const fuse = new Fuse(featuresList, fuseOptions)
  const results: SidebarItemWithFavouriteStatus[] = useMemo(() => {
    if (searchQuery === '') {
      return featuresList
    }
    return fuse.search(searchQuery).map((item) => item.item)
  }, [searchQuery, favouriteFeatures])

  const onDoubleClickHeader = () => {
    ipcRenderer.send('toggle-maximize')
  }

  return (
    <div className={styles.sidebar} style={{ background: props.backgroundColor }}>
      <div
        className={cn(
          styles.sidebarHeader,
          process.platform === 'darwin' && styles.sidebarHeaderMacOs,
          'draggable-area',
        )}
        onDoubleClick={onDoubleClickHeader}
      />
      <div className={styles.sidebarSearch}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.sidebarSearchInput}
          placeholder="Search..."
        />
        <div className={styles.sidebarSearchRight}>⌘+K</div>
      </div>
      <div className={cn(styles.sidebarInside, styles.scrollbar)}>
        {results.map((Feature) => {
          return (
            <Link key={Feature.id} to={`/features/${Feature.id}`} className={styles.menuItem}>
              <Feature.sidebarIcon className={''} size={16} />
              {Feature.title}
              {Feature.isFavourite && (
                <div className={styles.favouriteIcon}>
                  <IconHeart size={13} />
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
