import { useMemo, useState } from "react";
import AceEditor from "react-ace";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import styles from './JsonFormatter.module.scss';

import InputBar from "../../components/organisms/input-bar/InputBar";
import OutputBar from "../../components/organisms/output-bar/OutputBar";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";

const SAMPLE_DATA = `{"employees":{"employee":[{"id":"1","firstName":"Tom","lastName":"Cruise","photo":"https://jsonformatter.org/img/tom-cruise.jpg"},{"id":"2","firstName":"Maria","lastName":"Sharapova","photo":"https://jsonformatter.org/img/Maria-Sharapova.jpg"},{"id":"3","firstName":"Robert","lastName":"Downey Jr.","photo":"https://jsonformatter.org/img/Robert-Downey-Jr.jpg"}]}}`

const JsonFormatter = () => {
  const [inputText, setInputText] = useState('')

  const outputText = useMemo(() => {
    if (inputText === '') {
      return '';
    }

    try {
      return JSON.stringify(JSON.parse(inputText), null, 2);
    } catch (err: any) {
      return err?.message || "Invalid Input"
    }
  }, [inputText]);

  return (
      <div className={styles.page}>
        <div className={styles.splitContainer}>
          <ReflexContainer orientation="vertical">
            <ReflexElement className="pane">
              <InputBar
                  onClickPaste={(text) => setInputText(text)}
                  onClickSample={() => setInputText(SAMPLE_DATA)}
                  onClickClear={() => setInputText('')}
              />
              <AceEditor
                  fontSize={13}
                  style={{flex: 1, width: "100%"}}
                  mode="json"
                  theme="one_dark"
                  value={inputText}
                  onChange={text => setInputText(text)}
                  name="json-formatter-input"
                  editorProps={{$blockScrolling: true}}
                  wrapEnabled={true}
                  placeholder={"Type URL..."}
              />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement className="pane">
              <OutputBar copyValue={outputText} />
              <AceEditor
                  readOnly={true}
                  fontSize={13}
                  style={{flex: 1, width: "100%"}}
                  mode="json"
                  theme="one_dark"
                  value={outputText}
                  name="json-formatter-output"
                  editorProps={{$blockScrolling: true}}
                  wrapEnabled={true}
                  showPrintMargin={false}
                  placeholder={"Formatted JSON"}
              />
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
  )
}

export default JsonFormatter
