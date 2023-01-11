export class JsonFormatterService {
  static format(text: string): string {
    return JSON.stringify(JSON.parse(text), null, 2)
  }
}
