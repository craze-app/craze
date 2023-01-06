import { useMemo, useState } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import styles from './HtmlPreview.module.scss'
import { htmlPreviewSample } from './HtmlPreview.sample'

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'

const HtmlPreview = () => {
  const [inputText, setInputText] = useState<string>('')

  const outputFile = useMemo(() => {
    // @TODO: write text to file and show with iframe
    return inputText
  }, [inputText])

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="vertical">
          <ReflexElement className="pane" minSize={100}>
            <InputBar
              onClickPaste={(text) => setInputText(text)}
              onClickClear={() => setInputText('')}
              onClickSample={() => setInputText(htmlPreviewSample)}
            />
            <AceEditor
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="html"
              theme="one_dark"
              value={inputText}
              onChange={(text) => setInputText(text)}
              name="html-preview-input"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={'Enter your HTML'}
            />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement className="pane" minSize={100}>
            <iframe className={styles.htmlPreviewOutput} src={outputFile}></iframe>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default HtmlPreview
