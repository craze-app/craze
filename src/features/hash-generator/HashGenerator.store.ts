import create from 'zustand'

import { HashGeneratorState } from './HashGenerator.types'

export const useHashGeneratorStore = create<HashGeneratorState>((set) => ({
  input: '',
  setInput: (input) => {
    set({ input })
  },
}))
