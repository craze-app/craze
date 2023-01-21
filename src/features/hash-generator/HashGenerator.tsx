import { useMemo } from 'react'
import AceEditor from 'react-ace'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import cn from 'classnames'

import InputBar from '../../components/organisms/input-bar/InputBar'
import { FeatureRouteComponent } from '../../features'
import { loadElementSize, saveElementSize } from '../../helpers/resize'
import styles from './HashGenerator.module.scss'
import { hashGeneratorSample } from './HashGenerator.sample'
import { HashGeneratorService } from './HashGenerator.service'
import { useHashGeneratorStore } from './HashGenerator.store'
import { HashGeneratorAlgorithms, HashGeneratorHashes } from './HashGenerator.types'

const HashGenerator = ({ id }: FeatureRouteComponent) => {
  const { input, setInput } = useHashGeneratorStore()

  const hashes: HashGeneratorHashes = useMemo(() => {
    return HashGeneratorService.hash(input)
  }, [input])

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            className="pane"
            minSize={100}
            flex={loadElementSize(id, 0, 50)}
            onStopResize={({ component }) =>
              saveElementSize(id, 0, component.props.flex as number)
            }>
            <InputBar
              onClickPaste={(text) => setInput(text)}
              onClickSample={() => setInput(hashGeneratorSample.SAMPLE_TEXT)}
              onClickClear={() => setInput('')}
            />
            <AceEditor
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="text"
              theme="one_dark"
              value={input}
              onChange={(text) => setInput(text)}
              name="hash-generator-input"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={'Type raw content..'}
            />
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement
            className="pane"
            minSize={100}
            flex={loadElementSize(id, 1, 50)}
            onStopResize={({ component }) =>
              saveElementSize(id, 1, component.props.flex as number)
            }>
            <div className={cn(styles.scrollable, 'scrollbar')}>
              {Object.keys(hashes).map((key) => (
                <div key={key} className={styles.section}>
                  <div className={'text-input-label'}>{key}</div>
                  <input
                    readOnly={true}
                    type="text"
                    className={'text-input'}
                    value={hashes[key as HashGeneratorAlgorithms]}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              ))}
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default HashGenerator
