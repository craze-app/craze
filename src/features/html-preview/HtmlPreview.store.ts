import create from 'zustand'

import { HtmlPreviewState } from './HtmlPreview.types'

export const useHtmlPreviewStore = create<HtmlPreviewState>((set) => ({
  inputText: '',
  filePath: '',
  setInputText: (text) => {
    set({ inputText: text })
  },
  setFilePath: (path) => {
    set({ filePath: path })
  },
}))
