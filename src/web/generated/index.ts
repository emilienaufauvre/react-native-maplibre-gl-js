import 'maplibre-gl/dist/maplibre-gl.css'
import MapController from '../maplibre-gl-js/MapController'
import ReactNativeBridge from '../bridge/ReactNativeBridge'

/**
 * Main entry point for the web app to be bundled. Initialize the map controller
 * and the bridge to communicate with React Native, then send a ready message.
 */
const main = () => {
  const controller = new MapController()
  const bridge = new ReactNativeBridge()
  controller.reactNativeBridge = bridge
  bridge.mapController = controller
  bridge.postMessage({ type: 'ready' })
}

main()
