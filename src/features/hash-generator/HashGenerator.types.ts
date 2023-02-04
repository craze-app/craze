export type HashGeneratorState = {
  input: string
  setInput: (input: string) => void
}

export enum HashGeneratorAlgorithms {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA224 = 'SHA224',
  SHA256 = 'SHA256',
  SHA3 = 'SHA3',
  SHA2512 = 'SHA512',
}

export type HashGeneratorHashes = {
  [key in HashGeneratorAlgorithms]: string
}
