import styles from "./InputBar.module.scss"
import {ReactNode} from "react";

type InputBarProps = {
  label?: string
  onClickPaste: (clipboard: string) => void
  onClickSample: () => void
  onClickClear: () => void
  rightComponent?: ReactNode
}

const InputBar = (props: InputBarProps) => {

  const onClickPasteHandler = async () => {
    const clipboardText = await navigator.clipboard.readText()
    props.onClickPaste(clipboardText)
  }

  return (
    <div className={styles.inputBar}>
      <div className={styles.title}>{props.label || "Input"}: </div>
      <div className={styles.buttons}>
        <button onClick={onClickPasteHandler}>
          Paste
        </button>
        <button onClick={props.onClickSample}>
          Sample
        </button>
        <button onClick={props.onClickClear}>
          Clear
        </button>
      </div>
      {props.rightComponent && <div className={styles.right}>{props.rightComponent}</div>}
    </div>
  )
}

export default InputBar
