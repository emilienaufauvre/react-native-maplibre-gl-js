import { build } from 'esbuild'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths.
const WEB_DIR = path.resolve(__dirname, '../src/web/generated')
const OUTPUT_FILE = path.join(WEB_DIR, 'webview_static_html.ts')
const ENTRY_FILE = path.join(WEB_DIR, 'index.ts')
const HTML_TEMPLATE_FILE = path.join(WEB_DIR, 'index.html')
const MAPLIBRE_CSS_FILE = path.resolve(
  __dirname,
  '../node_modules/maplibre-gl/dist/maplibre-gl.css',
)

/**
 * Escape HTML so it can be safely embedded in a template literal.
 * @param str - The string to escape.
 * @returns - The escaped string.
 */
const escapeForTemplateLiteral = (str) => {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

/**
 * Build the webview_static_html.ts file.
 */
const main = async () => {
  // Bundle the TypeScript.
  const result = await build({
    entryPoints: [ENTRY_FILE],
    bundle: true,
    format: 'iife',
    platform: 'browser',
    sourcemap: false,
    write: false, // Do not write any files to disk:
    outfile: 'bundle.js', // > virtual name for the main output.
    loader: {
      '.png': 'dataurl',
      '.svg': 'dataurl',
    },
  })
  const jsOutput = result.outputFiles?.find((file) =>
    file.path.endsWith('bundle.js'),
  )
  if (!jsOutput) {
    throw new Error('Failed to find JS bundle output from esbuild')
  }
  const js = jsOutput.text
  const htmlTemplate = fs.readFileSync(HTML_TEMPLATE_FILE, 'utf8')
  const maplibreCss = fs.readFileSync(MAPLIBRE_CSS_FILE, 'utf8')
  // Inline the CSS and JS into the HTML template
  const inlinedHtml = htmlTemplate
    .replace('</head>', `<style>${maplibreCss}</style></head>`)
    .replace('</body>', `<script>${js}</script></body>`)
  // Wrap as a TS export with a template literal
  const escaped = '`' + escapeForTemplateLiteral(inlinedHtml) + '`'
  const fileContents = `export const WEBVIEW_STATIC_HTML = ${escaped};\n`

  fs.writeFileSync(OUTPUT_FILE, fileContents, 'utf8')
  console.log(`${OUTPUT_FILE} generated.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
