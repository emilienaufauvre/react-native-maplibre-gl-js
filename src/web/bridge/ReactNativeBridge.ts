import type CoreController from '../controllers/CoreController'
import WebLogger from '../logger/web-logger'
import type {
  MessageFromRNToWeb,
  MessageFromWebToRN,
} from '../../communication/messages.types'

/**
 * From the web world, manage bidirectional communication with the React Native
 * one by receiving and sending messages.
 */
export default class ReactNativeBridge {
  #controller?: CoreController

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
   * Post a message to the React Native world.
   * @param message - The message to be sent.
   */
  postMessage(message: MessageFromWebToRN) {
    WebLogger.debug(this.postMessage.name, message)
    // @ts-ignore
    window.ReactNativeWebView?.postMessage(JSON.stringify(message))
  }
}
