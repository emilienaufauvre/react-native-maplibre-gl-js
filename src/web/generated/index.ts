import 'maplibre-gl/dist/maplibre-gl.css'
import ReactNativeBridge from '@ml/web/bridge/ReactNativeBridge'
import MapController from '@ml/web/maplibre-gl-js/MapController'

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
