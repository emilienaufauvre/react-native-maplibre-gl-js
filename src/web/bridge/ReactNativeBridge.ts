import type MapController from '@ml/web/maplibre-gl-js/MapController'
import type {
  MessageFromRNToWeb,
  MessageFromWebToRN,
} from '@ml/communication/messages.types'
import WebLogger from '@ml/web/logger/web-logger'

/**
 * From the web world, manage bidirectional communication with the React Native
 * one by receiving and sending messages.
 */
export default class ReactNativeBridge {
  #mapController?: MapController

  constructor() {
    const messageHandler = (raw: any) => {
      try {
        WebLogger.debug(this.constructor.name, raw?.data)
        const data = typeof raw?.data === 'string' ? raw.data : raw
        const message = JSON.parse(data) as MessageFromRNToWeb
        this.mapController?.handleMessage(message)
      } catch (error: any) {
        WebLogger.error(this.constructor.name, error.message)
      }
    }
    // Listen to React Native messages and forward them to the map controller.
    document.addEventListener?.('message', messageHandler)
    window.addEventListener?.('message', messageHandler)
  }

  set mapController(controller: MapController) {
    this.#mapController = controller
  }

  get mapController(): MapController | undefined {
    return this.#mapController
  }

  postMessage(message: MessageFromWebToRN) {
    WebLogger.debug(this.postMessage.name, message)
    // @ts-ignore
    window.ReactNativeWebView?.postMessage(JSON.stringify(message))
  }
}
