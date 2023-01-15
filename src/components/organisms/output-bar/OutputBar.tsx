import { ReactNode } from 'react'

import styles from './OutputBar.module.scss'

type OutputBarProps = {
  label?: string
  copyValue?: string
  rightComponent?: ReactNode
}

const OutputBar = (props: OutputBarProps) => {
  const onClickCopyHandler = async () => {
    if (props.copyValue !== undefined) {
      await navigator.clipboard.writeText(props.copyValue)
    }
  }

  return (
    <div className={styles.outputBar}>
      <div className={styles.title}>{props.label || 'Output'}: </div>
      <div className={styles.buttons}>
        {props.copyValue !== undefined && (
          <button onClick={onClickCopyHandler}>Copy Clipboard</button>
        )}
      </div>
      {props.rightComponent && <div className={styles.right}>{props.rightComponent}</div>}
    </div>
  )
}

export default OutputBar
