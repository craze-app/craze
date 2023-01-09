import { IMarker } from 'react-ace/src/types'

export type RegexTesterState = {
  regexQuery: string
  flags: RegexFlags
  testCases: string
  setRegexQuery: (query: string) => void
  setFlags: (flags: RegexFlags) => void
  setTestCases: (testCases: string) => void
}

export type RegexFlags = {
  g: boolean
  m: boolean
  i: boolean
}

export type RegexTestResult = {
  markers: IMarker[]
  matches: string[]
  isValid: boolean
}
