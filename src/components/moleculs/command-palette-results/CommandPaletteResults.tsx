import React from 'react'

import { ActionId, KBarResults, useMatches } from 'kbar'

import CommandPaletteResultItem from '../../atoms/command-palette-result-item/CommandPaletteResultItem'
import styles from './CommandPaletteResults.module.scss'

const CommandPaletteResults = () => {
  const { results, rootActionId } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className={styles.groupName}>{item}</div>
        ) : (
          <CommandPaletteResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId as ActionId}
          />
        )
      }
    />
  )
}

export default CommandPaletteResults
