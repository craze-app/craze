import { useMemo, useState } from "react";
import AceEditor from "react-ace";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import styles from './Base64String.module.scss';

import InputBar from "../../components/organisms/input-bar/InputBar";
import OutputBar from "../../components/organisms/output-bar/OutputBar";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";

enum ActionType {
    ENCODE = "ENCODE",
    DECODE = "DECODE",
}

const SAMPLE_DATA = {
    [ActionType.ENCODE]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    [ActionType.DECODE]: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEu',
}

const Base64String = () => {
    const [inputText, setInputText] = useState<string>('')
    const [actionType, setActionType] = useState<ActionType>(ActionType.ENCODE)

    const outputText = useMemo(() => {
        if (inputText === '') {
            return '';
        }

        try {
            // @TODO: Use better alternatives for btoa and atob
            if (actionType === ActionType.ENCODE) {
                return btoa(inputText);
            } else {
                return atob(inputText);
            }
        } catch (err: any) {
            return err?.message || "Invalid Input"
        }
    }, [inputText]);

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

export default Base64String
