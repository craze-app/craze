import React, { forwardRef, useMemo } from 'react'

import cn from 'classnames'
import { ActionId, ActionImpl } from 'kbar'

import styles from './CommandPaletteResultItem.module.scss'

type CommandPaletteResultItemProps = {
  action: ActionImpl
  active: boolean
  currentRootActionId: ActionId
}

const CommandPaletteResultItem = (
  props: CommandPaletteResultItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const ancestors = useMemo(() => {
    if (!props.currentRootActionId) return props.action.ancestors
    const index = props.action.ancestors.findIndex(
      (ancestor) => ancestor.id === props.currentRootActionId,
    )
    return props.action.ancestors.slice(index + 1)
  }, [props.action.ancestors, props.currentRootActionId])

  return (
    <div ref={ref} className={cn(styles.item, props.active && styles.activeItem)}>
      <div className={styles.itemBox}>
        {props.action.icon && props.action.icon}
        <div className={styles.titleContainer}>
          <div>
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span className={styles.ancestor1}>{ancestor.name}</span>
                  <span className={styles.ancestor2}>&rsaquo;</span>
                </React.Fragment>
              ))}
            <span>{props.action.name}</span>
          </div>
          {props.action.subtitle && (
            <span className={styles.subtitle}>{props.action.subtitle}</span>
          )}
        </div>
      </div>
      {props.action.shortcut?.length ? (
        <div aria-hidden className={styles.shortcut}>
          {props.action.shortcut.map((sc) => (
            <kbd key={sc}>{sc}</kbd>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default forwardRef(CommandPaletteResultItem)
