// TODO how to disable in prod?
import type { MessageFromWebToRN } from '../../communication/messages.types'

const __DEV__ = true

const createLoggerMethod = (level: 'debug' | 'info' | 'error') => {
  if (!__DEV__) {
    return () => {}
  }
  return (func: string, ...args: any[]) => {
    // Send to React Native WebView if available.
    try {
      const message: MessageFromWebToRN = {
        type: 'console',
        payload: {
          level,
          args: [func, ...args],
        },
      }
      // @ts-ignore
      window.ReactNativeWebView?.postMessage(JSON.stringify(message))
    } catch {}
  }
}

/**
 * Logger to be used from the Web world. Will post the log to the React Native
 * world. Works only in __DEV__.
 */
const WebLogger = {
  debug: createLoggerMethod('debug'),
  info: createLoggerMethod('info'),
  error: createLoggerMethod('error'),
}

export default WebLogger
