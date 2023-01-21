import QRCode from 'qrcode'

import { qrCodeGeneratorSample } from './QrCodeGenerator.sample'

export class QrCodeGeneratorService {
  static drawCanvas(canvas: HTMLCanvasElement, content: string) {
    return QRCode.toCanvas(canvas, content || qrCodeGeneratorSample.URL, { width: 300, margin: 1 })
  }

  static getDataUrl(content: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(content || qrCodeGeneratorSample.URL, function (err, url) {
        if (err) {
          reject({})
          return
        }
        resolve(url)
      })
    })
  }
}
