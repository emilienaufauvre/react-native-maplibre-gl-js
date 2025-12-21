import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WEBVIEW_STATIC_HTML } from '../../../web/generated/webview_static_html'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import {
  useFlushMessagesOnMapMounted,
  useStyles,
  useWebMessageHandler,
} from './MapProvider.hooks'
import type { MapProviderProps } from './MapProvider.types'

/**
 * Must be used as a parent component to allow instantiation of map elements.
 * Every child must be a direct component.
 * This is the bridge to the web world / the `MapLibre GL JS` library.
 * @param props -
 * @group Components
 * @example
 * ```tsx
 * <MapProvider>
 *   <Map/>
 *   <Marker/>
 *   ...
 * </MapProvider>
 * ```
 */
const MapProvider = ({ style, webViewStyle, children }: MapProviderProps) => {
  // States.
  // - Global.
  const { setWebView } = useMapAtoms()
  // Theme.
  const styles = useStyles()
  // Behaviors.
  useFlushMessagesOnMapMounted()
  const { handler } = useWebMessageHandler()

  return (
    <View style={[styles.container, style]}>
      <WebView
        testID={'map-provider-webview'}
        ref={setWebView}
        style={[styles.webView, webViewStyle]}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        allowFileAccess={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode={'always'}
        onMessage={handler}
        source={{ html: WEBVIEW_STATIC_HTML }}
      />
      {children}
    </View>
  )
}

export default MapProvider
