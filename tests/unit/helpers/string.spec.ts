import { describe, expect, it } from '@jest/globals'

import { convertBase64ToBlob, getCharPositionInText } from '../../../src/helpers/string'

describe('getCharPositionInText', () => {
  it('should return undefined for negative char index', () => {
    const text = 'abc\ndef'
    const charIndex = -1
    expect(getCharPositionInText(text, charIndex)).toBeUndefined()
  })

  it('should return undefined for char index beyond end of text', () => {
    const text = 'abc\ndef'
    const charIndex = 8
    expect(getCharPositionInText(text, charIndex)).toBeUndefined()
  })

  it('should return correct char position for char at beginning of text', () => {
    const text = 'abc\ndef'
    const charIndex = 0
    const expectedResult = { row: 0, col: 0 }
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult)
  })

  it('should return correct char position for char in middle of text', () => {
    const text = 'abc\ndef'
    const charIndex = 5
    const expectedResult = { row: 1, col: 1 }
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult)
  })

  it('should return correct char position for char at end of text', () => {
    const text = 'abc\ndef'
    const charIndex = 6
    const expectedResult = { row: 1, col: 2 }
    expect(getCharPositionInText(text, charIndex)).toEqual(expectedResult)
  })
})

describe('convertBase64ToBlob', () => {
  it('converts a base64 image string to a Blob object', () => {
    const base64Image =
      'data:image/png;base64,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'
    const blob = convertBase64ToBlob(base64Image)
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('image/png')
  })

  it('handles invalid base64 input', () => {
    const base64Image = 'data:imag3e/png;badse64,'
    expect(() => convertBase64ToBlob(base64Image)).toThrowError()
  })
})
