import { ReactNode } from 'react'

import styles from './OutputBar.module.scss'

type OutputBarProps = {
  label?: string
  copyValue: string
  customButtons?: Array<{ key: string; label: string; onClick: () => void }>
  rightComponent?: ReactNode
}

const OutputBar = (props: OutputBarProps) => {
  const onClickCopyHandler = async () => {
    await navigator.clipboard.writeText(props.copyValue)
  }

  return (
    <div className={styles.outputBar}>
      <div className={styles.title}>{props.label || 'Output'}:</div>
      <div className={styles.buttons}>
        <button onClick={onClickCopyHandler}>Copy Clipboard</button>
        {props.customButtons &&
          props.customButtons.map((button) => (
            <button key={button.key} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
      </div>
      {props.rightComponent && <div className={styles.right}>{props.rightComponent}</div>}
    </div>
  )
}

export default OutputBar
