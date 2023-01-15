import { ipcRenderer } from 'electron'

import { useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'
import Drawer from 'react-modern-drawer'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import InputBar from '../../components/organisms/input-bar/InputBar'
import OutputBar from '../../components/organisms/output-bar/OutputBar'
import { FeatureRouteComponent } from '../../features'
import { loadElementSize, saveElementSize } from '../../helpers/resize'
import { convertBase64ToBlob } from '../../helpers/string'
import QrCheatSheet from './data/QrCodeCheatSheet.json'
import styles from './QrCodeGenerator.module.scss'
import { qrCodeGeneratorSample } from './QrCodeGenerator.sample'
import { QrCodeGeneratorService } from './QrCodeGenerator.service'
import { useQrCodeGeneratorStore } from './QrCodeGenerator.store'

import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox.js'

const DrawerContent = ({
  status,
  toggle,
}: {
  status: boolean
  toggle: (status: boolean) => void
}) => {
  return (
    <Drawer
      open={status}
      onClose={() => toggle(false)}
      direction="right"
      size={360}
      className="drawer-container">
      <div className="drawer-header">QR Code Cheat Sheet</div>
      <div className={styles.drawerSections}>
        {QrCheatSheet.cheatsheet.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`} className={styles.drawerSection}>
            <div className={styles.sectionTitle}>{section.name}</div>
            <pre className={styles.codeBlock}>{section.content}</pre>
          </div>
        ))}
      </div>
    </Drawer>
  )
}

const QrCodeGenerator = ({ id }: FeatureRouteComponent) => {
  const { input, setInput, dataUrl, setDataUrl } = useQrCodeGeneratorStore()
  const [drawerStatus, setDrawerStatus] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setTimeout(generateCanvas)
  }, [input, canvasRef])

  const generateCanvas = () => {
    if (canvasRef.current) {
      QrCodeGeneratorService.drawCanvas(canvasRef.current, input)
    }
  }

  useEffect(() => {
    QrCodeGeneratorService.getDataUrl(input).then((dataUrl) => {
      setDataUrl(dataUrl)
    })
  }, [input])

  const downloadImage = async () => {
    const blob = convertBase64ToBlob(dataUrl)
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    ipcRenderer.send('save-file-dialog', {
      content: buffer,
      filters: [
        {
          name: new Date().toJSON(),
          extensions: ['png'],
        },
      ],
    })
  }

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
              onClickSample={() => {
                setInput(qrCodeGeneratorSample.URL)
              }}
              onClickClear={() => {
                setInput('')
              }}
              rightComponent={<button onClick={() => setDrawerStatus(true)}>Cheat Sheet</button>}
            />
            <AceEditor
              fontSize={13}
              style={{ flex: 1, width: '100%' }}
              mode="text"
              theme="one_dark"
              value={input}
              onChange={(text) => setInput(text)}
              name="qr-code-input"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled={true}
              placeholder={'Your text'}
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
            <OutputBar
              copyValue={dataUrl}
              copyValueImage={true}
              customButtons={[
                { key: 'download-image', label: 'Download Image', onClick: downloadImage },
              ]}
            />
            <div className={styles.qrBox}>
              <canvas ref={canvasRef} id={'qr-code-canvas'} className={styles.qrCanvas}></canvas>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
      <DrawerContent status={drawerStatus} toggle={setDrawerStatus} />
    </div>
  )
}

export default QrCodeGenerator
