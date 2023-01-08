export const loadElementSize = (
  featureId: string,
  elementIndex: number,
  defaultSize: number,
): number => {
  const key = `${featureId}_${elementIndex}`
  const sizeString = localStorage.getItem(key)
  if (sizeString) {
    return Number(sizeString)
  }
  return defaultSize
}

export const saveElementSize = (
  featureId: string,
  elementIndex: number,
  currentSize: number,
): void => {
  const key = `${featureId}_${elementIndex}`
  localStorage.setItem(key, String(currentSize))
}
