import {useMemo, useState} from "react";
import AceEditor from "react-ace";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import styles from './RegexTester.module.scss';
import {IconAlertCircle} from "@tabler/icons";
import {getCharPositionInText} from "../../helpers/string";
import InputBar from "../../components/organisms/input-bar/InputBar";
import OutputBar from "../../components/organisms/output-bar/OutputBar";
import {IMarker} from "react-ace/src/types";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import 'ace-builds/src-min-noconflict/ext-searchbox';
import {RegexTesterService} from "./RegexTester.service";
import {RegexFlags, RegexTestResult} from "./RegexTester.types";

const SAMPLE_DATA = {
  regex: "l[a-z]+",
  test: `Lorem Ipsum is simply dummy text of 
the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard 
dummy text ever since the 1500s, when an unknown 
printer took a galley of type and scrambled it to 
make a type specimen book. It has survived 
not only five centuries, but also the leap into 
lectronic typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of 
Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing 
software like Aldus PageMaker including 
versions of Lorem Ipsum`
}

const RegexTester = () => {
  const [regexQuery, setRegexQuery] = useState<string>('')
  const [flags, setFlags] = useState<RegexFlags>({g: true, m: true, i: true})
  const [testCases, setTestCases] = useState<string>('')

  const results: RegexTestResult = useMemo(() => {
    const regexTesterService = new RegexTesterService(testCases, regexQuery, flags)
    return regexTesterService.getResults()
  }, [regexQuery, testCases, flags]);

  const matchesList = results.matches.join('\n')
  const flagsText = Object.keys(flags).filter((flag) => flags[flag as keyof RegexFlags]).join('')

  const RenderInputSettings = () => {
    return (
      <div className={styles.flags}>
        <label htmlFor="flag-i">
          <input id={"flag-i"} type={"checkbox"} value={"i"}
                 checked={flags.i}
                 onChange={(e) => setFlags(flags => ({...flags, i: !flags["i"]}))}/>
          <span>insensetive</span>
        </label>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <ReflexContainer orientation="vertical">
          <ReflexElement className="pane" flex={3}>
            <InputBar
              onClickPaste={(text) => setRegexQuery(text)}
              onClickSample={() => {
                setRegexQuery(SAMPLE_DATA.regex)
                setTestCases(SAMPLE_DATA.test)
              }}
              onClickClear={() => {
                setRegexQuery('')
                setTestCases('')
              }}
              rightComponent={<RenderInputSettings/>}
            />
            <div className={styles.inputGroup}>
              <div className={styles.prefix}><span className={styles.biggerText}>/</span></div>
              <input className={styles.input} placeholder={"Type Regex"} value={regexQuery}
                     onChange={e => setRegexQuery(e.target.value)}/>
              {!results.isValid && (
                <div className={styles.invalidRegex}>
                  <IconAlertCircle size={18} color={"#d32e2e"}/>
                </div>
              )}
              <div className={styles.suffix}>
                <span className={styles.biggerText}>/</span>
                {' '}
                <span
                  className={styles.flagsText}>{flagsText}</span>
              </div>
            </div>
            <AceEditor
              fontSize={13}
              style={{flex: 1, width: "100%"}}
              mode="text"
              theme="one_dark"
              value={testCases}
              onChange={text => setTestCases(text)}
              name="test-cases-input"
              editorProps={{$blockScrolling: true}}
              wrapEnabled={true}
              placeholder={"Type test cases, supports multiline"}
              markers={results.markers}
            />
          </ReflexElement>
          <ReflexSplitter/>
          <ReflexElement className="pane" flex={2}>
            <OutputBar copyValue={matchesList}/>
            <AceEditor
              readOnly={true}
              fontSize={13}
              style={{flex: 1, width: "100%"}}
              mode="text"
              theme="one_dark"
              value={matchesList}
              name="matches-list"
              editorProps={{$blockScrolling: true}}
              wrapEnabled={true}
              placeholder={"Matches"}
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    </div>
  )
}

export default RegexTester
