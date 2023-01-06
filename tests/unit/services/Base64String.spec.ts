import { Base64StringService } from '../../../src/features/base64-string/Base64String.service'

describe('Base64StringService', () => {
  it('should encode a string', () => {
    const result = Base64StringService.encode('test string')
    expect(result).toBe('dGVzdCBzdHJpbmc=')
  })

  it('should decode a string', () => {
    const result = Base64StringService.decode('dGVzdCBzdHJpbmc=')
    expect(result).toBe('test string')
  })
})
