import { FC } from 'react'

import { IconBraces, IconRegex, IconTransform, IconUnlink, TablerIcon } from '@tabler/icons'

import Base64String from './features/base64-string/Base64String'
import JsonFormatter from './features/json-formatter/JsonFormatter'
import RegexTester from './features/regex-tester/RegexTester'
import UrlEncodeDecode from './features/url-encode-decode/UrlEncodeDecode'

export type Feature = {
  id: string
  component: FC
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
  {id: "base64-string", component: Base64String, title: "Base64 String Encode/Decode", sidebarIcon: IconTransform},
  {id: "html-preview", component: HtmlPreview, title: "HTML Preview", sidebarIcon: IconCode},
]
