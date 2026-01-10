import 'maplibre-gl/dist/maplibre-gl.css'
import CoreController from '../controllers/CoreController'
import ReactNativeBridge from '../bridge/ReactNativeBridge'

/**
 * Main entry point for the web app to be bundled. Initialize the map controller
 * and the bridge to communicate with React Native, then send a ready message.
 */
const main = () => {
  const controller = new CoreController()
  const bridge = new ReactNativeBridge()
  bridge.controller = controller
  bridge.postMessage({ type: 'ready' })
  // Expose main objects to the native scripts that could be injected within the
  // WebView.
  ;(window as any).__RNML_CONTROLLER = controller
  ;(window as any).__RNML_BRIDGE = bridge
}

main()
