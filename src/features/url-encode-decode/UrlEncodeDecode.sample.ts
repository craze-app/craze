import {UrlEncodeDecodeActions} from "./UrlEncodeDecode.types";

export const urlEncodeDecodeSample = {
  [UrlEncodeDecodeActions.ENCODE]: "https://fonts.google.com/?query=quicksand&category=Sans+Serif&preview.text=Input:&preview.text_type=custom",
  [UrlEncodeDecodeActions.DECODE]: "https%3A%2F%2Ffonts.google.com%2F%3Fquery%3Dquicksand%26category%3DSans%2BSerif%26preview.text%3DInput%3A%26preview.text_type%3Dcustom"
}
