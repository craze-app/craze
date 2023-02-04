import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from 'kbar'

import { features } from '../../../features'
import CommandPaletteResults from '../../moleculs/command-palette-results/CommandPaletteResults'
import styles from './CommandPalette.module.scss'

const CommandPalette = (props: { children: React.ReactNode }) => {
  const history = useHistory()

  const actions = useMemo(() => {
    return features.map((feature) => ({
      id: `feature-${feature.id}`,
      name: feature.title,
      keywords: feature.title,
      perform: () => history.push(`/features/${feature.id}`),
    }))
  }, [features])

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.animator}>
            <KBarSearch className={styles.search} />
            <CommandPaletteResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {props.children}
    </KBarProvider>
  )
}

export default CommandPalette
