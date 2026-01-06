import type CoreController from '../controllers/CoreController'
import WebLogger from '../logger/web-logger'
import type {
  MessageFromRNToWeb,
  MessageFromWebToRN,
} from '../../communication/messages.types'

const keepOnlyLastMessagePerType = (): boolean => {
  try {
    // Read a runtime flag exposed by MapProvider in the WebView environment.
    return Boolean(
      (window as any)?.__RNML_MESSAGEOPTIONS_KEEPONLYLASTMESSAGEPERTYPE,
    )
  } catch (_) {
    return false
  }
}

const getFlushIntervalMs = (): number => {
  try {
    // Read a runtime flag exposed by MapProvider in the WebView environment.
    return Number((window as any)?.__RNML_MESSAGEOPTIONS_FLUSHINTERVALMS)
  } catch (_) {
    return 0
  }
}

/**
 * From the web world, manages bidirectional communication with the React Native
 * side by receiving and sending messages.
 */
export default class ReactNativeBridge {
  #controller?: CoreController
  #outgoingQueue: MessageFromWebToRN[] = []
  #flushTimer: number | undefined

  constructor() {
    const messageHandler = (raw: any) => {
      try {
        WebLogger.debug(this.constructor.name, raw?.data)
        const data = typeof raw?.data === 'string' ? raw.data : raw
        const message = JSON.parse(data) as MessageFromRNToWeb
        this.controller?.handleMessage(message, this)
      } catch (error: any) {
        WebLogger.error(this.constructor.name, error.message)
      }
    }
    // Listen to React Native messages and forward them to the controller.
    document.addEventListener?.('message', messageHandler)
    window.addEventListener?.('message', messageHandler)
  }

  set controller(controller: CoreController) {
    this.#controller = controller
  }

  get controller(): CoreController | undefined {
    return this.#controller
  }

  /**
   * Posts a message to the React Native world.
   * Messages are queued and flushed as a single batched message to optimize
   * performance.
   * @param message - The message to send.
   */
  postMessage(message: MessageFromWebToRN) {
    WebLogger.debug(this.postMessage.name, message)
    this.#outgoingQueue.push(message)
    this.#scheduleFlush()
  }

  #scheduleFlush = () => {
    if (this.#flushTimer !== undefined) {
      return
    }
    this.#flushTimer = window.setTimeout(this.#flush, getFlushIntervalMs())
  }

  #flush = () => {
    if (this.#flushTimer !== undefined) {
      clearTimeout(this.#flushTimer)
      this.#flushTimer = undefined
    }

    const queue = this.#outgoingQueue
    this.#outgoingQueue = []
    if (queue.length === 0) {
      return
    }

    let messages = queue
    if (keepOnlyLastMessagePerType()) {
      // For listener events, keep only the last occurrence for the same
      // identity.
      // - webObjectListenerEvent: objectId + eventName
      // - mapSourceListenerEvent: sourceId + layerId + eventName
      const lastIndexByKey = new Map<string, number>()
      const keyFor = (m: MessageFromWebToRN): string | null => {
        if (m.type === 'webObjectListenerEvent') {
          const { objectId, eventName } = m.payload
          return `webObjectListenerEvent|${objectId}|${String(eventName)}`
        }
        if (m.type === 'mapSourceListenerEvent') {
          const { sourceId, layerId, eventName } = m.payload
          return `mapSourceListenerEvent|${sourceId}|${layerId}|${String(eventName)}`
        }
        return null
      }

      queue.forEach((m, i) => {
        const k = keyFor(m)
        if (k) {
          lastIndexByKey.set(k, i)
        }
      })

      messages = queue.filter((m, i) => {
        const k = keyFor(m)
        if (!k) {
          return true
        }
        return lastIndexByKey.get(k) === i
      })
    }

    // Send the message as a single batched message.
    const batched: MessageFromWebToRN = {
      type: 'batch',
      payload: { messages },
    } as any
    // @ts-ignore
    window.ReactNativeWebView?.postMessage(JSON.stringify(batched))
  }
}
