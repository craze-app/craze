import { useMemo, useState } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import { FeatureRouteComponent } from '../../features'
import { loadElementSize, saveElementSize } from '../../helpers/resize'
import styles from './JsonFormatter.module.scss'
import { SAMPLE_DATA } from './JsonFormatter.sample'
import { JsonFormatterService } from './JsonFormatter.service'
import { useJsonFormatterStore } from './JsonFormatter.store'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'

const JsonFormatter = ({ id }: FeatureRouteComponent) => {
  const { inputText, setInputText } = useJsonFormatterStore()

  const outputText = useMemo(() => {
    if (inputText === '') {
      return ''
    }

    try {
      return JsonFormatterService.format(inputText)
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message
      }

      return 'Invalid Input'
    }
  }, [inputText])

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
              onClickSample={() => setInputText(SAMPLE_DATA)}
              onClickClear={() => setInputText('')}
            />
            <AceEditor
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="json"
              theme="one_dark"
              value={inputText}
              onChange={(text) => setInputText(text)}
              name="json-formatter-input"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              placeholder={'Type JSON...'}
            />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement
            className="pane"
            flex={loadElementSize(id, 1, 40)}
            onStopResize={({ component }) =>
              saveElementSize(id, 1, component.props.flex as number)
            }>
            <OutputBar copyValue={outputText} />
            <AceEditor
              readOnly={true}
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="json"
              theme="one_dark"
              value={outputText}
              name="json-formatter-output"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              showPrintMargin={false}
              placeholder={'Formatted JSON'}
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default JsonFormatter
