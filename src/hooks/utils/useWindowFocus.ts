import {useEffect, useState} from "react";
import {ipcRenderer} from "electron";

type useWindowsFocusResponse = {
  isFocused: boolean
}

const useWindowFocus = (): useWindowsFocusResponse => {
  const [isFocused, setIsFocused] = useState(true)

  useEffect(() => {
    ipcRenderer.on('focused', () =>{
      setIsFocused(true)
    })

    ipcRenderer.on('blurred', () =>{
      setIsFocused(false)
    })

  }, [])
  return {isFocused}
}

export default useWindowFocus
