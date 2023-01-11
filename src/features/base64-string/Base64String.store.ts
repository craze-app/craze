import create from 'zustand'

import { Base64StringActions, Base64StringState } from './Base64String.types'

export const useBase64StringStore = create<Base64StringState>((set) => ({
  inputText: '',
  actionType: Base64StringActions.ENCODE,
  setInputText: (text) => {
    set({ inputText: text })
  },
  setActionType: (actionType) => {
    set({ actionType })
  },
}))
