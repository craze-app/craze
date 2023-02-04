export class Base64StringService {
  static encode(text: string): string {
    return window.btoa(text)
  }

  static decode(text: string): string {
    return window.atob(text)
  }
}
