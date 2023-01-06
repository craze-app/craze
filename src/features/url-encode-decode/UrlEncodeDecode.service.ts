export class UrlEncodeDecodeService {
  static encode(text: string): string {
    return encodeURIComponent(text)
  }

  static decode(text: string): string {
    return decodeURIComponent(text)
  }
}
