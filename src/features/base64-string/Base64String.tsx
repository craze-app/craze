import { useMemo } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import styles from './Base64String.module.scss'
import { base64StringSample } from './Base64String.sample'
import { Base64StringService } from './Base64String.service'
import { useBase64StringStore } from './Base64String.store'
import { Base64StringActions } from './Base64String.types'

import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'

const Base64String = () => {
  const { inputText, actionType, setInputText, setActionType } = useBase64StringStore()

  const outputText = useMemo(() => {
    if (inputText === '') {
      return ''
    }

    try {
      if (actionType === Base64StringActions.ENCODE) {
        return Base64StringService.encode(inputText)
      } else {
        return Base64StringService.decode(inputText)
      }
    } catch (err) {
      const error = err as Error

      return error?.message || 'Invalid Input'
    }
  }, [inputText, actionType])

  const RenderInputTypes = () => {
    return (
      <div className={styles.actionTypes}>
        <label htmlFor="action-encode">
          <input
            id={'action-encode'}
            type={'radio'}
            value={Base64StringActions.ENCODE}
            checked={actionType === Base64StringActions.ENCODE}
            onChange={(e) => setActionType(e.target.value as Base64StringActions)}
          />{' '}
          <span>Encode</span>
        </label>
        <label htmlFor="action-decode">
          <input
            id={'action-decode'}
            type={'radio'}
            value={Base64StringActions.DECODE}
            checked={actionType === Base64StringActions.DECODE}
            onChange={(e) => setActionType(e.target.value as Base64StringActions)}
          />{' '}
          <span>Decode</span>
        </label>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement className="pane" minSize={100}>
            <InputBar
              onClickPaste={(text) => setInputText(text)}
              onClickClear={() => setInputText('')}
              onClickSample={() => setInputText(base64StringSample[actionType])}
              rightComponent={<RenderInputTypes />}
            />
            <AceEditor
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="text"
              theme="one_dark"
              value={inputText}
              onChange={(text) => setInputText(text)}
              name="url-encode-decode-input"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={'Type URL...'}
            />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement className="pane" minSize={100}>
            <OutputBar copyValue={outputText} />
            <AceEditor
              readOnly={true}
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="text"
              theme="one_dark"
              value={outputText}
              name="url-encode-decode-output"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={
                actionType === Base64StringActions.ENCODE ? 'Encoded URL' : 'Decoded URL'
              }
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default Base64String
