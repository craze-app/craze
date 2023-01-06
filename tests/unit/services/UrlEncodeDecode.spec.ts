import { describe, expect, it } from '@jest/globals'

import { UrlEncodeDecodeService } from '../../../src/features/url-encode-decode/UrlEncodeDecode.service'

describe('UrlEncodeDecodeService', () => {
  describe('encode', () => {
    it('should correctly encode a string', () => {
      const input = 'hello world'
      const expectedOutput = 'hello%20world'
      expect(UrlEncodeDecodeService.encode(input)).toEqual(expectedOutput)
    })
  })

  describe('decode', () => {
    it('should correctly decode a string', () => {
      const input = 'hello%20world'
      const expectedOutput = 'hello world'
      expect(UrlEncodeDecodeService.decode(input)).toEqual(expectedOutput)
    })
  })
})
