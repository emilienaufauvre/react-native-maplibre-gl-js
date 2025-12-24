import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type { MessageFromRNToWeb } from '../../communication/messages.types'
import WebLogger from '../logger/web-logger'
import WebObjectsController from './WebObjectsController'
import MapSourcesController from './MapSourcesController'

/**
 * Manage the `MapLibre GL JS` map and objects, sources and layers. Receive
 * messages from the React Native world and act accordingly by redirecting them
 * to the appropriate controller.
 */
export default class CoreController {
  #webObjectsController: WebObjectsController
  #mapSourcesController: MapSourcesController

  constructor() {
    this.#webObjectsController = new WebObjectsController()
    this.#mapSourcesController = new MapSourcesController()
  }

  handleMessage = (
    message: MessageFromRNToWeb,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    WebLogger.info(this.handleMessage.name, message)

    try {
      switch (message.type) {
        case 'webObjectMount': {
          this.#webObjectsController.handleMountMessage(
            message,
            reactNativeBridge,
          )
          break
        }
        case 'webObjectUnmount': {
          this.#webObjectsController.handleUnmountMessage(
            message,
            reactNativeBridge,
          )
          break
        }
        case 'webObjectMethodCall': {
          this.#webObjectsController
            .handleMethodCall(message, reactNativeBridge)
            .then()
          break
        }
        case 'mapSourceMount': {
          this.#mapSourcesController.handleMountMessage(
            message,
            reactNativeBridge,
            this.#webObjectsController.map,
          )
          break
        }
        case 'mapSourceUnmount': {
          this.#mapSourcesController.handleUnmountMessage(
            message,
            reactNativeBridge,
            this.#webObjectsController.map,
          )
          break
        }
      }
    } catch (error: any) {
      WebLogger.error(this.handleMessage.name, error.message)
    }
  }
}
