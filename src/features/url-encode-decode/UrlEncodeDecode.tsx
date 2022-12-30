import styles from "./UrlEncodeDecode.module.scss"
import InputBar from "../../components/organisms/input-bar/InputBar";
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'
import {useEffect, useMemo, useState} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import OutputBar from "../../components/organisms/output-bar/OutputBar";

enum ActionType {
  ENCODE = "ENCOE",
  DECODE = "DECODE"
}

const SAMPLE_DATA = {
  [ActionType.ENCODE]: "https://fonts.google.com/?query=quicksand&category=Sans+Serif&preview.text=Input:&preview.text_type=custom",
  [ActionType.DECODE]: "https%3A%2F%2Ffonts.google.com%2F%3Fquery%3Dquicksand%26category%3DSans%2BSerif%26preview.text%3DInput%3A%26preview.text_type%3Dcustom"
}
const UrlEncodeDecode = () => {

  const [inputText, setInputText] = useState("")
  const [actionType, setActionType] = useState<ActionType>(ActionType.ENCODE)

  const outputText = useMemo(() => {
    try {
      if (actionType === ActionType.ENCODE) {
        return encodeURIComponent(inputText)
      } else {
        return decodeURIComponent(inputText)
      }
    } catch (err) {
      return "Invalid Input"
    }
  }, [inputText, actionType]);

  const RenderInputTypes = () => {
    return (
      <div className={styles.actionTypes}>
        <label htmlFor="action-encode">
          <input id={"action-encode"} type={"radio"} value={ActionType.ENCODE}
                 checked={actionType === ActionType.ENCODE}
                 onChange={(e) => setActionType(e.target.value as ActionType)}/> <span>Encode</span>
        </label>
        <label htmlFor="action-decode">
          <input id={"action-decode"} type={"radio"} value={ActionType.DECODE}
                 checked={actionType === ActionType.DECODE}
                 onChange={(e) => setActionType(e.target.value as ActionType)}/> <span>Decode</span>
        </label>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement className="pane" minSize={100}>
            <InputBar onClickPaste={(text) => setInputText(text)} onClickClear={() => setInputText("")}
                      onClickSample={() => setInputText(SAMPLE_DATA[actionType])} rightComponent={<RenderInputTypes/>}/>
            <AceEditor
              fontSize={13}
              style={{flex: 1, width: "100%"}}
              mode="text"
              theme="one_dark"
              value={inputText}
              onChange={text => setInputText(text)}
              name="url-encode-decode-input"
              editorProps={{$blockScrolling: true}}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={"Type URL..."}
            />
          </ReflexElement>
          <ReflexSplitter/>
          <ReflexElement className="pane" minSize={100}>
            <OutputBar copyValue={outputText} />
            <AceEditor
              readOnly={true}
              fontSize={13}
              style={{flex: 1, width: "100%"}}
              mode="text"
              theme="one_dark"
              value={outputText}
              name="url-encode-decode-output"
              editorProps={{$blockScrolling: true}}
              wrapEnabled={true}
              showGutter={false}
              showPrintMargin={false}
              placeholder={actionType === ActionType.ENCODE ? "Encoded URL" : "Decoded URL"}
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default UrlEncodeDecode
