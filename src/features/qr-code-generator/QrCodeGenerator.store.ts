import create from 'zustand'

import { QrCodeGeneratorState, QrCodeImageExtensions } from './QrCodeGenerator.types'

export const useQrCodeGeneratorStore = create<QrCodeGeneratorState>((set) => ({
  input: '',
  dataUrl: '',
  imageType: QrCodeImageExtensions.PNG,
  setInput: (input) => {
    set({ input })
  },
  setDataUrl: (dataUrl) => {
    set({ dataUrl })
  },
  setImageType: (type) => {
    set({ imageType: type })
  },
}))
