import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { createStore, Provider } from 'jotai'
import { WEBVIEW_STATIC_HTML } from '../../../../web/generated/webview_static_html'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import {
  useCssInjectionScript,
  useFlushMessagesOnMapMounted,
  useInjectJavaScriptIfCssStylesChanged,
  useStyles,
  useWebMessageHandler,
} from './MapProvider.hooks'
import type { MapProviderProps } from './MapProvider.types'

/**
 * Must be used as a parent component to allow instantiation of map elements.
 * Every child must be a direct component.
 * This is the bridge to the web world / the `MapLibre GL JS` library.
 * @param props -
 * @group Components – core
 * @example
 * ```tsx
 * <MapProvider>
 *   <Map/>
 *   <Marker/>
 *   ...
 * </MapProvider>
 * ```
 */
const MapProvider = (props: MapProviderProps) => {
  // Create an isolated Jotai store per MapProvider instance so that all atoms
  // used by children (via useMapAtoms) are scoped to this provider.
  const store = createStore()

  return (
    <Provider store={store}>
      <MapProviderInner {...props} />
    </Provider>
  )
}

/**
 * ...
 */
const MapProviderInner = ({
  style,
  webViewStyle,
  children,
  cssStyles,
}: MapProviderProps) => {
  // States.
  // - Global.
  const { setWebView } = useMapAtoms()
  // Theme.
  const styles = useStyles()
  // Behaviors.
  useFlushMessagesOnMapMounted()
  const { handler } = useWebMessageHandler()
  const { cssInjectionScript } = useCssInjectionScript(cssStyles)
  useInjectJavaScriptIfCssStylesChanged(cssInjectionScript)

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
