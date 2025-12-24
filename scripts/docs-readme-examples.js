import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths.
const ROUTES_DIR = path.resolve(__dirname, '../example/src/app')
const README_FILE = path.resolve(__dirname, '../README.md')

// Markdown level of the example folders.
const FOLDER_LEVEL = '###'

// Markdown markers to be placed in README.
const START_MARKER = '<!-- EXAMPLES-LIST:START -->'
const END_MARKER = '<!-- EXAMPLES-LIST:END -->'

/**
 * Prettify a string for display.
 * @param str - Raw string.
 * @returns - Prettified string.
 */
const pretty = (str) => {
  return str.replace(/[-_]/g, ' ').trim()
}

/**
 * Recursively walk a directory and return all file paths.
 * @param dir - Directory to walk.
 * @returns - An array of file paths.
 */
const walk = async (dir) => {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath)))
    } else {
      results.push(fullPath)
    }
  }

  return results
}

/**
 * Generate the example list and inject it into README.md.
 */
const main = async () => {
  // Collect route files.
  const files = await walk(ROUTES_DIR)

  const routes = files
    .map((file) => path.relative(ROUTES_DIR, file).split(path.sep).join('/'))
    .filter(
      (file) =>
        /\.tsx?$/.test(file) &&
        !file.includes('_layout') &&
        file !== 'index.tsx',
    )
    .map((relativePath) => {
      const withoutExt = relativePath.replace(/\.tsx?$/, '')
      const parts = withoutExt.split('/')

      const folderRaw = parts[0]
      const nameRaw = parts.length > 1 ? parts.slice(1).join('/') : folderRaw

      const title = pretty(nameRaw)
      const [first, ...rest] = title.split(' ')

      const hasIndex = /^\d+$/.test(first)

      return {
        folder: pretty(folderRaw),
        index: hasIndex ? first : '',
        title: hasIndex ? rest.join(' ') : title,
        link: `./example/src/app/${relativePath}`,
      }
    })
    .sort((a, b) => {
      if (a.folder !== b.folder) {
        return a.folder.localeCompare(b.folder)
      }
      return a.index.localeCompare(b.index)
    })

  // Group by folder.
  const grouped = Object.groupBy(routes, (route) => route.folder)

  // Build markdown.
  let markdown = '_No example for now._'

  const folders = Object.keys(grouped).sort()
  if (folders.length > 0) {
    markdown = folders
      .map((folder) => {
        const items = grouped[folder]
          .map((route) => {
            const label =
              `${route.index ? route.index + ' ' : ''}${route.title}`.trim()
            return `- [\`${label}\`](${route.link})`
          })
          .join('\n')

        return `${FOLDER_LEVEL} ${folder}\n\n${items}`
      })
      .join('\n\n')
  }

  // Read README to find markers.
  const readme = fs.readFileSync(README_FILE, 'utf8')
  const startIndex = readme.indexOf(START_MARKER)
  const endIndex = readme.indexOf(END_MARKER)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error('README markers not found or invalid')
  }

  // Inject updated content.
  const updatedReadme =
    readme.slice(0, startIndex + START_MARKER.length) +
    `\n\n${markdown}\n\n` +
    readme.slice(endIndex)

  fs.writeFileSync(README_FILE, updatedReadme, 'utf8')
  console.log('README.md updated.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
