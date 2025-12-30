import type { MessageFromWebToRN } from '../../communication/messages.types'

const isWebLoggerEnabled = (): boolean => {
  try {
    // Read a runtime flag exposed by MapProvider in the WebView environment.
    // If not set, default to false (disabled).
    return Boolean((window as any)?.__RNML_WEBLOGGER_ENABLED)
  } catch (_) {
    return false
  }
}

const createLoggerMethod = (level: 'debug' | 'info' | 'error') => {
  return (func: string, ...args: any[]) => {
    if (!isWebLoggerEnabled()) {
      return
    }
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
 * world. Controlled by MapProvider prop `webLoggerEnabled` (disabled by
 * default).
 */
const WebLogger = {
  debug: createLoggerMethod('debug'),
  info: createLoggerMethod('info'),
  error: createLoggerMethod('error'),
}

export default WebLogger
