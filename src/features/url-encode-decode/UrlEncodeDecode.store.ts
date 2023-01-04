import create from 'zustand'
import {UrlEncodeDecodeActions, UrlEncodeDecodeState} from "./UrlEncodeDecode.types";

export const useUrlEncodeDecodeStore = create<UrlEncodeDecodeState>((set) => ({
  inputText: "",
  actionType: UrlEncodeDecodeActions.ENCODE,
  setInputText: (text) => {
    set({inputText: text})
  },
  setActionType: (actionType) => {
    set({actionType})
  }
}))
