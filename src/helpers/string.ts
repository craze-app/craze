export const getCharPositionInText = (
  text: string,
  charIndex: number,
): { row: number; col: number } | undefined => {
  if (charIndex < 0 || charIndex >= text.length) {
    return undefined
  }

  let row = 0
  let col = 0
  for (let i = 0; i < text.length; i++) {
    if (i === charIndex) {
      return { row, col }
    }
    col++
    if (text[i] === '\n') {
      row++
      col = 0
    }
  }

  return undefined
}

export const convertBase64ToBlob = (base64Image: string) => {
  try {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: imageType })
  } catch (err) {
    throw Error()
  }
}

export const nl2br = (text: string): string => {
  return text.replace(/\n/g, '<br />')
}
