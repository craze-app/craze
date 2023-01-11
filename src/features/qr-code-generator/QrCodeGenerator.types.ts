export enum QrCodeImageExtensions {
  PNG = 'png',
  SVG = 'svg',
}

export enum QrCodeImageTemplates {
  LIGHT = 'light',
  DARK = 'dark',
}

export type QrCodeGeneratorState = {
  input: string
  dataUrl: string
  imageType: QrCodeImageExtensions
  setInput: (input: string) => void
  setDataUrl: (dataUrl: string) => void
  setImageType: (type: QrCodeImageExtensions) => void
}
