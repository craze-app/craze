import JsonFormatter from "./features/json-formatter/JsonFormatter";
import {IconBraces, IconTransform, IconUnlink, TablerIcon} from "@tabler/icons";
import UrlEncodeDecode from "./features/url-encode-decode/UrlEncodeDecode";
import {FC} from "react";
import Base64String from "./features/base64-string/Base64String";

export type Feature = {
  id: string
  component: FC
  title: string
  sidebarIcon: TablerIcon
}

export const features: Feature[] = [
  {id: "json-formatter", component: JsonFormatter, title: "JSON Formatter", sidebarIcon: IconBraces},
  {id: "url-encode-decode", component: UrlEncodeDecode, title: "URL Encode/Decode", sidebarIcon: IconUnlink},
  {id: "base64-string", component: Base64String, title: "Base64 String Encode/Decode", sidebarIcon: IconTransform},
]
