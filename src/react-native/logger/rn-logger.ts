import { consoleTransport, logger } from 'react-native-logs'
import pkg from 'react-native-maplibre-gl-js/package.json'

type LogOrigin = 'RN' | 'Web'

const BASE_LOGGER = logger.createLogger({
  severity: __DEV__ ? 'debug' : 'none',
  transport: __DEV__ ? consoleTransport : () => {},
  transportOptions: {
    colors: {
      debug: 'grey',
      info: 'greenBright',
      error: 'redBright',
    },
  },
  formatFunc: (level, _, args) => {
    const timeColumn = new Date().toLocaleTimeString().padEnd(8)
    const levelColumn = level.toUpperCase().padEnd(5)
    const packageColumn = pkg.name
    const fromColumn =
      args[0].padEnd(3) + ' ' + (args[0] === 'Web' ? '🌐' : '⚛️')
    const funcColumn = args[1].padEnd(20)
    const text = args.slice(2).join(' ')
    return `${timeColumn} | ${levelColumn} | ${packageColumn} | ${fromColumn} | ${funcColumn} : ${text}`
  },
})

const createLoggerMethod = (level: keyof typeof BASE_LOGGER) => {
  return (from: LogOrigin, func: string, ...args: any[]) => {
    const stringifiedArgs = args.map((item) =>
      typeof item === 'string' ? item : JSON.stringify(item, null, 2),
    )
    return (BASE_LOGGER[level] as (...args: any[]) => void)(
      from,
      func !== '' ? func : 'Anonymous function',
      ...stringifiedArgs,
    )
  }
}

/**
 * Logger to be used from the React Native world. Will log to the default
 * output. Works only in __DEV__.
 */
const RNLogger = {
  debug: createLoggerMethod('debug'),
  info: createLoggerMethod('info'),
  error: createLoggerMethod('error'),
  enable() {
    BASE_LOGGER.enable()
  },
  disable() {
    BASE_LOGGER.disable()
  },
}

export default RNLogger
