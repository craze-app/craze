import { useMemo, useState } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import styles from './UrlEncodeDecode.module.scss'
import { urlEncodeDecodeSample } from './UrlEncodeDecode.sample'
import { UrlEncodeDecodeService } from './UrlEncodeDecode.service'
import { UrlEncodeDecodeActions } from './UrlEncodeDecode.types'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-one_dark'

const UrlEncodeDecode = () => {
  const [inputText, setInputText] = useState<string>('')
  const [actionType, setActionType] = useState<UrlEncodeDecodeActions>(
    UrlEncodeDecodeActions.ENCODE
  )

  const outputText = useMemo(() => {
    try {
      if (actionType === UrlEncodeDecodeActions.ENCODE) {
        return UrlEncodeDecodeService.encode(inputText)
      } else {
        return UrlEncodeDecodeService.decode(inputText)
      }
    } catch (err) {
      return 'Invalid Input'
    }
  }, [inputText, actionType])

  const RenderInputTypes = () => {
    return (
      <div className={styles.actionTypes}>
        <label htmlFor="action-encode">
          <input
            id={'action-encode'}
            type={'radio'}
            value={UrlEncodeDecodeActions.ENCODE}
            checked={actionType === UrlEncodeDecodeActions.ENCODE}
            onChange={(e) => setActionType(e.target.value as UrlEncodeDecodeActions)}
          />{' '}
          <span>Encode</span>
        </label>
        <label htmlFor="action-decode">
          <input
            id={'action-decode'}
            type={'radio'}
            value={UrlEncodeDecodeActions.DECODE}
            checked={actionType === UrlEncodeDecodeActions.DECODE}
            onChange={(e) => setActionType(e.target.value as UrlEncodeDecodeActions)}
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
              onClickSample={() => setInputText(urlEncodeDecodeSample[actionType])}
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
                actionType === UrlEncodeDecodeActions.ENCODE ? 'Encoded URL' : 'Decoded URL'
              }
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default UrlEncodeDecode
