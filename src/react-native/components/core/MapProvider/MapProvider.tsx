import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { WEBVIEW_STATIC_HTML } from '../../../../web/generated/webview_static_html'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import {
  useCssStylesInjectionScript,
  useEnableDisableRNLogger,
  useFlushMessagesOnMapMounted,
  useInjectJavaScriptIfAScriptChanged,
  useInjectJavaScriptIfScriptChanged,
  useMessageOptionsInjectionScript,
  useStyles,
  useWebLoggerEnabledInjectionScript,
  useWebMessageHandler,
} from './MapProvider.hooks'
import type { MapProviderProps } from './MapProvider.types'
import { ScopeProvider } from 'jotai-scope'
import { mapAtomsList } from '../../../hooks/atoms/mapAtoms'

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
  // Atoms use by this library are scoped by MapProvider so consumers of this
  // library can keep using their own Jotai store and atoms inside custom
  // components rendered under MapProvider.
  return (
    <ScopeProvider atoms={mapAtomsList}>
      <MapProviderInner {...props} />
    </ScopeProvider>
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
  rnLoggerEnabled = false,
  webLoggerEnabled = false,
  webMessageOptions = {
    flushIntervalMs: 100,
    keepOnlyLastMessagePerType: true,
  },
  nativeScripts = [],
  onWebViewReset = () => {},
}: MapProviderProps) => {
  // States.
  // - Global.
  const { setWebView, webWorldSessionKey, reset } = useMapAtoms()
  // Theme.
  const styles = useStyles()
  // Behaviors.
  const { handler } = useWebMessageHandler()
  useEnableDisableRNLogger(rnLoggerEnabled)
  useFlushMessagesOnMapMounted()
  const { cssStylesInjectionScript } = useCssStylesInjectionScript(cssStyles)
  const { webLoggerEnabledInjectionScript } =
    useWebLoggerEnabledInjectionScript(webLoggerEnabled)
  const { messageOptionsInjectionScript } =
    useMessageOptionsInjectionScript(webMessageOptions)
  useInjectJavaScriptIfScriptChanged(cssStylesInjectionScript)
  useInjectJavaScriptIfScriptChanged(webLoggerEnabledInjectionScript)
  useInjectJavaScriptIfScriptChanged(messageOptionsInjectionScript)
  useInjectJavaScriptIfAScriptChanged(nativeScripts)

  return (
    <View style={[styles.container, style]}>
      <WebView
        key={'map-provider-webview-session-' + webWorldSessionKey}
        testID={'map-provider-webview'}
        ref={setWebView}
        style={[styles.webView, webViewStyle]}
        scrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handler}
        source={{ html: WEBVIEW_STATIC_HTML }}
        injectedJavaScriptBeforeContentLoaded={[
          cssStylesInjectionScript,
          webLoggerEnabledInjectionScript,
          messageOptionsInjectionScript,
        ].join(';')}
        // Trigger the reload everything (remount, etc. by changing the session
        // key and resetting atoms) if the webview has crashed or was closed if
        // app in background.
        // - For iOS:
        onContentProcessDidTerminate={() => {
          reset()
          onWebViewReset()
        }}
        // - For Android:
        onRenderProcessGone={() => {
          reset()
          onWebViewReset()
        }}
        // - TODO add for web once supported?
      />
      {children}
    </View>
  )
}

export default MapProvider
