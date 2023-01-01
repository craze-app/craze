export const getCharPositionInText = (text: string, charIndex: number): {row: number, col: number} | undefined => {
  let row = 0;
  let col = 0;
  for (let i = 0; i < text.length; i++) {
    if (i === charIndex) {
      return {row, col};
    }
    col++;
    if (text[i] === '\n') {
      row++;
      col = 0;
    }
  }
  return undefined
}
