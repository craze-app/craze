import QRCode from 'qrcode'

export class QrCodeGeneratorService {
  static drawCanvas(canvas: HTMLCanvasElement, content: string): Promise<void> {
    return QRCode.toCanvas(canvas, content, { width: 250 })
  }
}
