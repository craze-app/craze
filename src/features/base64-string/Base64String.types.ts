export enum Base64StringActions {
  ENCODE = 'ENCODE',
  DECODE = 'DECODE',
}

export type Base64StringState = {
  inputText: string
  actionType: Base64StringActions
  setInputText: (text: string) => void
  setActionType: (actionType: Base64StringActions) => void
}
