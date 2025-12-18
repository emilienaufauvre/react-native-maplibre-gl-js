import fs from 'node:fs/promises'
import path from 'node:path'

const ROUTES_DIR = 'example/src/app'
const README = 'README.md'
const FOLDER_LEVEL = '###'
const START = '<!-- EXAMPLES-LIST:START -->'
const END = '<!-- EXAMPLES-LIST:END -->'

// -------- utils --------
const pretty = (s) =>
  s
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((e) => {
        const p = path.join(dir, e.name)
        return e.isDirectory() ? walk(p) : p
      }),
    )
  ).flat()
}

// -------- main --------
const main = async () => {
  const rootAbs = path.resolve(ROUTES_DIR)
  const files = await walk(rootAbs)

  const routes = files
    .map((f) => path.relative(rootAbs, f).split(path.sep).join('/'))
    .filter(
      (f) => /\.tsx?$/.test(f) && !f.includes('_layout') && f !== 'index.tsx',
    )
    .map((rel) => {
      const clean = rel.replace(/\.tsx?$/, '')
      const [folderRaw, ...rest] = clean.split('/')
      const nameRaw = rest.length ? rest.join('/') : folderRaw

      const title = pretty(nameRaw)
      const [index, ...label] = title.split(' ')

      return {
        folder: pretty(folderRaw),
        index: /^\d+$/.test(index) ? index : '',
        title: /^\d+$/.test(index) ? label.join(' ') : title,
        link: `./${ROUTES_DIR}/${rel}`,
      }
    })
    .sort(
      (a, b) =>
        a.folder.localeCompare(b.folder) || a.index.localeCompare(b.index),
    )

  const grouped = Object.groupBy(routes, (r) => r.folder)

  const md =
    Object.keys(grouped)
      .sort()
      .map(
        (folder) =>
          `${FOLDER_LEVEL} ${folder}\n\n` +
          grouped[folder]
            .map((r) => {
              const label = `${r.index ? r.index + ' ' : ''}${r.title}`.trim()
              return `- [\`${label}\`](${r.link})`
            })
            .join('\n'),
      )
      .join('\n\n') || '_No example for now._'

  const readme = await fs.readFile(README, 'utf8')
  const s = readme.indexOf(START)
  const e = readme.indexOf(END)

  if (s === -1 || e === -1 || e < s) {
    throw new Error('README markers not found')
  }

  const updated =
    readme.slice(0, s + START.length) + `\n\n${md}\n\n` + readme.slice(e)

  await fs.writeFile(README, updated)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
