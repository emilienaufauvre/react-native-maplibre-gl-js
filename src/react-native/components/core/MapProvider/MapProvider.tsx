import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WEBVIEW_STATIC_HTML } from '../../../../web/generated/webview_static_html'
import useMapAtoms, { MAP_ATOMS } from '../../../hooks/atoms/useMapAtoms'
import {
  useCssInjectionScript,
  useFlushMessagesOnMapMounted,
  useInjectJavaScriptIfScriptChanged,
  useLoggerInjectionScript,
  useStyles,
  useWebMessageHandler,
} from './MapProvider.hooks'
import type { MapProviderProps } from './MapProvider.types'
import { ScopeProvider } from 'jotai-scope'

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
const MapProvider = ({
  style,
  webViewStyle,
  children,
  cssStyles,
  webLoggerEnabled,
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
  const { loggerInjectionScript } = useLoggerInjectionScript(webLoggerEnabled)
  useInjectJavaScriptIfScriptChanged(cssInjectionScript)
  useInjectJavaScriptIfScriptChanged(loggerInjectionScript)

  return (
    // Specify the Jotai atoms that the provider relies on, so library users can
    // safely use their own Jotai atoms in custom components rendered inside a
    // MapProvider.
    <ScopeProvider atoms={MAP_ATOMS}>
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
          injectedJavaScriptBeforeContentLoaded={[
            cssInjectionScript,
            loggerInjectionScript,
          ].join(';')}
        />
        {children}
      </View>
    </ScopeProvider>
  )
}

export default MapProvider
