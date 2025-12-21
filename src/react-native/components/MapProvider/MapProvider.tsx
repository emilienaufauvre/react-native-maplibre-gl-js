import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WEBVIEW_STATIC_HTML } from '../../../web/generated/webview_static_html'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import {
  useFlushMessagesOnMapMounted,
  useCssInjectionScript,
  useInjectJavaScriptIfInjectedCssChanged,
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
const MapProvider = ({
  style,
  webViewStyle,
  children,
  injectedCss,
}: MapProviderProps) => {
  // States.
  // - Global.
  const { setWebView } = useMapAtoms()
  // Theme.
  const styles = useStyles()
  // Behaviors.
  useFlushMessagesOnMapMounted()
  const { handler } = useWebMessageHandler()
  const { cssInjectionScript } = useCssInjectionScript(injectedCss)
  useInjectJavaScriptIfInjectedCssChanged(cssInjectionScript)

  return (
    <View style={[styles.container, style]}>
      <WebView
        testID={'map-provider-webview'}
        ref={setWebView}
        style={[styles.webView, webViewStyle]}
        scrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handler}
        source={{ html: WEBVIEW_STATIC_HTML }}
        injectedJavaScriptBeforeContentLoaded={cssInjectionScript}
      />
      {children}
    </View>
  )
}

export default MapProvider
