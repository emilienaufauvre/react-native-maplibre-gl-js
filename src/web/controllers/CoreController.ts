import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type { MessageFromRNToWeb } from '../../communication/messages.types'
import WebLogger from '../logger/web-logger'
import WebObjectsController from './WebObjectsController'
import MapSourcesController from './MapSourcesController'
import maplibregl from 'maplibre-gl'

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

    let map: maplibregl.Map | undefined

    try {
      map = this.#webObjectsController.map
    } catch (error: any) {}

    try {
      switch (message.type) {
        case 'batch': {
          // Handle batched messages by unpacking them and processing
          // sequentially.
          const { messages } = message.payload
          messages?.forEach((m) => this.handleMessage(m, reactNativeBridge))
          return
        }
        case 'webObjectMount': {
          this.#webObjectsController.handleMountMessage(
            message,
            reactNativeBridge,
          )
          break
        }
        case 'webObjectUpdate': {
          this.#webObjectsController.handleUpdateMessage(
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
        case 'mapSourceUpdate': {
          this.#mapSourcesController.handleUpdateMessage(
            message,
            reactNativeBridge,
            this.#webObjectsController.map,
          )
          break
        }
      }

      if (
        message.type === 'webObjectUpdate' &&
        message.payload.objectType === 'map' &&
        map !== this.#webObjectsController.map
      ) {
        // If the map was unmounted and mounted back again (e.g., on map
        // "options" props changed), the map object has changed: add back the
        // existing objects and sources to it.
        this.#webObjectsController.addExistingObjectsToMap(
          reactNativeBridge,
          this.#webObjectsController.map,
        )
        this.#mapSourcesController.addExistingSourcesToMap(
          reactNativeBridge,
          this.#webObjectsController.map,
        )
      }
    } catch (error: any) {
      WebLogger.error(this.handleMessage.name, error.message)
    }
  }
}
