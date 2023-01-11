import create from 'zustand'

import { JsonFormatterState } from './JsonFormatter.types'

export const useJsonFormatterStore = create<JsonFormatterState>((set) => ({
  inputText: '',
  setInputText: (text) => {
    set({ inputText: text })
  },
}))
