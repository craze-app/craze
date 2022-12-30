import JsonFormatter from "./features/json-formatter/JsonFormatter";
import {IconBraces, IconUnlink} from "@tabler/icons";
import UrlEncodeDecode from "./features/url-encode-decode/UrlEncodeDecode";

export const features = [
  {id: "json-formatter", component: JsonFormatter, title: "JSON Formatter", sidebarIcon: IconBraces},
  {id: "url-encode-decode", component: UrlEncodeDecode, title: "URL Encode/Decode", sidebarIcon: IconUnlink},
]
