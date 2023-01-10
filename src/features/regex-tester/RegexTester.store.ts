import create from 'zustand'

import { RegexTesterState } from './RegexTester.types'

export const useRegexTesterStore = create<RegexTesterState>((set) => ({
  regexQuery: '',
  flags: { g: true, m: true, i: true },
  testCases: '',
  setRegexQuery: (query) => {
    set({ regexQuery: query })
  },
  setFlags: (flags) => {
    set({ flags })
  },
  setTestCases: (testCases) => {
    const testCasesWithEndLine = testCases.endsWith('\n') ? testCases : `${testCases}\n`
    set({ testCases: testCasesWithEndLine })
  },
}))
