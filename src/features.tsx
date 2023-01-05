import { FC } from 'react'

import { IconBraces, IconRegex, IconUnlink, TablerIcon } from '@tabler/icons'

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
]
