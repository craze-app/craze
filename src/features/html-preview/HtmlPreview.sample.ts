import { HtmlPreviewActions } from "./HtmlPreview.types";

export const htmlPreviewSample = {
    [HtmlPreviewActions.FORMAT]: `
    <!DOCTYPE html>
<html>
<body>

<style>
  h1 { color: blue; }
</style>

<h1>Hello from DevUtils.app!</h1>
<p>This is a sample HTML page. By default, JavaScript and link navigation is disabled. You can click the gear icon to enable it.</p>
<p>Right click > Inspect Element also works.</p>
</body>
</html>`,
    [HtmlPreviewActions.MINIFY]: '<!DOCTYPE html><html><body><style>  h1 { color: blue; }</style><h1>Hello from DevUtils.app!</h1><p>This is a sample HTML page. By default, JavaScript and link navigation is disabled. You can click the gear icon to enable it.</p><p>Right click > Inspect Element also works.</p></body></html>',
}
