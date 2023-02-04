import Crypto from 'crypto-js'

import { HashGeneratorHashes } from './HashGenerator.types'

export class HashGeneratorService {
  static hash(text: string): HashGeneratorHashes {
    if (!text) {
      return { MD5: '', SHA1: '', SHA224: '', SHA256: '', SHA3: '', SHA512: '' }
    }
    return {
      MD5: Crypto.MD5(text).toString(),
      SHA1: Crypto.SHA1(text).toString(),
      SHA224: Crypto.SHA224(text).toString(),
      SHA256: Crypto.SHA256(text).toString(),
      SHA3: Crypto.SHA3(text).toString(),
      SHA512: Crypto.SHA512(text).toString(),
    }
  }
}
