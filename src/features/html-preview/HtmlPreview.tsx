import { useMemo, useState } from "react";
import AceEditor from "react-ace";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import styles from './HtmlPreview.module.scss';

import InputBar from "../../components/organisms/input-bar/InputBar";
import OutputBar from "../../components/organisms/output-bar/OutputBar";

import { HtmlPreviewActions } from "./HtmlPreview.types";
import { HtmlPreviewService } from "./HtmlPreview.service";
import { htmlPreviewSample } from "./HtmlPreview.sample";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";


const HtmlPreview = () => {
    const [inputText, setInputText] = useState<string>('')
    const [actionType, setActionType] = useState<HtmlPreviewActions>(HtmlPreviewActions.FORMAT)

    const outputText = useMemo(() => {
        if (inputText === '') {
            return '';
        }

        try {
            if (actionType === HtmlPreviewActions.FORMAT) {

            } else {

            }
        } catch (err: any) {
            return err?.message || "Invalid Input"
        }
    }, [inputText, actionType]);

    const RenderInputTypes = () => {
        return (
            <div className={styles.actionTypes}>
                <label htmlFor="action-encode">
                    <input id={"action-encode"} type={"radio"} value={HtmlPreviewActions.FORMAT}
                           checked={actionType === HtmlPreviewActions.FORMAT}
                           onChange={(e) => setActionType(e.target.value as HtmlPreviewActions)}/> <span>Encode</span>
                </label>
                <label htmlFor="action-decode">
                    <input id={"action-decode"} type={"radio"} value={HtmlPreviewActions.MINIFY}
                           checked={actionType === HtmlPreviewActions.MINIFY}
                           onChange={(e) => setActionType(e.target.value as HtmlPreviewActions)}/> <span>Decode</span>
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
                                  onClickSample={() => setInputText(htmlPreviewSample[actionType])} rightComponent={<RenderInputTypes/>}/>
                        <AceEditor
                            fontSize={13}
                            style={{flex: 1, width: "100%"}}
                            mode="text"
                            theme="one_dark"
                            value={inputText}
                            onChange={text => setInputText(text)}
                            name="html-preview-input"
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
                    </ReflexElement>
                </ReflexContainer>
            </div>
        </div>
    )
}

export default HtmlPreview
