import { ipcRenderer, shell } from 'electron'

import { useMemo, useState } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import { FeatureRouteComponent } from '../../features'
import { loadElementSize, saveElementSize } from '../../helpers/resize'
import styles from './HtmlPreview.module.scss'
import { htmlPreviewSample } from './HtmlPreview.sample'
import { useHtmlPreviewStore } from './HtmlPreview.store'

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox.js'

const HtmlPreview = ({ id }: FeatureRouteComponent) => {
  const { inputText, setInputText, filePath, setFilePath } = useHtmlPreviewStore()
  const [outputKey, setOutputKey] = useState<number>(Math.random)

  useMemo(() => {
    if (inputText === '') {
      return ''
    }

    ipcRenderer
      .invoke('write-text-to-file', { featureId: id, text: inputText })
      .then((result: string | null) => {
        if (result !== null) {
          setFilePath(result)
          setOutputKey(Math.random)
        }
      })
  }, [inputText])

  const openInBrowserAction = () => {
    shell.openExternal(filePath)
  }

  const RenderOpenInBrowser = () => {
    return <button onClick={openInBrowserAction}>Open in browser</button>
  }

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            className="pane"
            flex={loadElementSize(id, 0, 60)}
            onStopResize={({ component }) =>
              saveElementSize(id, 0, component.props.flex as number)
            }>
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
          <ReflexElement
            className="pane"
            flex={loadElementSize(id, 1, 40)}
            onStopResize={({ component }) =>
              saveElementSize(id, 1, component.props.flex as number)
            }>
            <OutputBar rightComponent={<RenderOpenInBrowser />} />
            <iframe key={outputKey} className={styles.htmlPreviewOutput} src={filePath}></iframe>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default HtmlPreview
