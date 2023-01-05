import { IMarker } from 'react-ace/src/types'

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
