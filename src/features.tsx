import { FC } from 'react'

import {
  IconBraces,
  IconCode,
  IconFingerprint,
  IconQrcode,
  IconRegex,
  IconTransform,
  IconUnlink,
  TablerIcon,
} from '@tabler/icons'

import Base64String from './features/base64-string/Base64String'
import HashGenerator from './features/hash-generator/HashGenerator'
import HtmlPreview from './features/html-preview/HtmlPreview'
import JsonFormatter from './features/json-formatter/JsonFormatter'
import QrCodeGenerator from './features/qr-code-generator/QrCodeGenerator'
import RegexTester from './features/regex-tester/RegexTester'
import UrlEncodeDecode from './features/url-encode-decode/UrlEncodeDecode'

export type FeatureRouteComponent = { id: string }

export type Feature = {
  id: string
  component: FC<FeatureRouteComponent>
  title: string
  sidebarIcon: TablerIcon
}

export const features: Feature[] = [
  {
    id: 'json-formatter',
    component: JsonFormatter,
    title: 'JSON Formatter',
    sidebarIcon: IconBraces,
  },
  {
    id: 'url-encode-decode',
    component: UrlEncodeDecode,
    title: 'URL Encode/Decode',
    sidebarIcon: IconUnlink,
  },
  { id: 'regex-tester', component: RegexTester, title: 'Regex Tester', sidebarIcon: IconRegex },
  {
    id: 'base64-string',
    component: Base64String,
    title: 'Base64 String Encode/Decode',
    sidebarIcon: IconTransform,
  },
  { id: 'html-preview', component: HtmlPreview, title: 'HTML Preview', sidebarIcon: IconCode },
  {
    id: 'qr-code-generator',
    component: QrCodeGenerator,
    title: 'QR Code Generator',
    sidebarIcon: IconQrcode,
  },
  {
    id: 'hash-generator',
    component: HashGenerator,
    title: 'Hash Generator',
    sidebarIcon: IconFingerprint,
  },
]
