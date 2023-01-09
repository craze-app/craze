import { MutableRefObject, useRef } from 'react'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import { FeatureRouteComponent } from '../../features'
import { loadElementSize, saveElementSize } from '../../helpers/resize'
import styles from './QrCodeGenerator.module.scss'
import { qrCodeGeneratorSample } from './QrCodeGenerator.sample'
import { QrCodeGeneratorService } from './QrCodeGenerator.service'

const QrCodeGenerator = ({ id }: FeatureRouteComponent) => {
  const qrCodeCanvas = useRef<HTMLCanvasElement>(null)

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement
            className="pane"
            minSize={100}
            flex={loadElementSize(id, 0, 50)}
            onStopResize={({ component }) =>
              saveElementSize(id, 0, component.props.flex as number)
            }>
            {/* Add InputBar component here */}
          </ReflexElement>
          <ReflexSplitter />
          <ReflexElement
            className="pane"
            minSize={100}
            flex={loadElementSize(id, 1, 50)}
            onStopResize={({ component }) =>
              saveElementSize(id, 1, component.props.flex as number)
            }>
            {/* Add OutputBar component here */}
            <canvas ref={qrCodeCanvas} id={'qr-code-canvas'}></canvas>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default QrCodeGenerator
