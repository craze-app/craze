import { ReactNode } from 'react'

import { convertBase64ToBlob } from '../../../helpers/string'
import styles from './OutputBar.module.scss'

type OutputBarProps = {
  label?: string
  copyValue: string
  copyValueImage?: boolean
  customButtons?: Array<{ key: string; label: string; onClick: () => void }>
  rightComponent?: ReactNode
}

const OutputBar = (props: OutputBarProps) => {
  const onClickCopyHandler = async () => {
    if (!props.copyValue) {
      return
    }

    if (!props.copyValueImage) {
      await navigator.clipboard.writeText(props.copyValue)
      return
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': convertBase64ToBlob(props.copyValue),
      }),
    ])
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
