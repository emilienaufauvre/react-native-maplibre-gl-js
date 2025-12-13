import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getDefaultConfig } from '@expo/metro-config'
import { withMetroConfig } from 'react-native-monorepo-config'

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.resolve(__dirname, '..')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname)

const config = withMetroConfig(baseConfig, {
  root,
  dirname: __dirname,
})

// Option Expo/Metro
config.resolver.unstable_enablePackageExports = true

export default config
