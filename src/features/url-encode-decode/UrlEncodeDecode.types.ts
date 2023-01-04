export type UrlEncodeDecodeState = {
  inputText: string
  actionType: UrlEncodeDecodeActions
  setInputText: (text: string) => void
  setActionType: (actionType: UrlEncodeDecodeActions) => void
}

export enum UrlEncodeDecodeActions {
  ENCODE = "ENCOE",
  DECODE = "DECODE"
}
