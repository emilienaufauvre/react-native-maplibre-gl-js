import { ScopeProvider } from 'jotai-scope'
import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { WEBVIEW_STATIC_HTML } from '../../../../web/generated/webview_static_html'
import { mapAtomsList } from '../../../hooks/atoms/mapAtoms'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import {
  useCssStylesInjectionScript,
  useEnableDisableRNLogger,
  useFlushMessagesOnMapMounted,
  useInjectJavaScriptIfAScriptChanged,
  useInjectJavaScriptIfScriptChanged,
  useMessageOptionsInjectionScript,
  useStableNativeScriptsAndCssStyles,
  useStyles,
  useWebLoggerEnabledInjectionScript,
  useWebMessageHandler,
} from './MapProvider.hooks'
import type {
  MapProviderProps,
  MapProviderWebViewTransport,
} from './MapProvider.types'

const createIframeSrcDoc = (
  html: string,
  injectedJavaScriptBeforeContentLoaded: string,
): string => {
  const bridgeScript = `<script>(function(){window.ReactNativeWebView={postMessage:function(message){window.parent.postMessage(String(message),'*')}};return true;})()</script>`
  const injectedScript = injectedJavaScriptBeforeContentLoaded
    ? `<script>${injectedJavaScriptBeforeContentLoaded}</script>`
    : ''

  return html.replace('</head>', `${bridgeScript}${injectedScript}</head>`)
}

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
 * Web implementation of MapProvider based on an iframe transport.
 */
const MapProviderInner = ({
  style,
  webViewStyle,
  children,
  cssStyles,
  nativeScripts,
  rnLoggerEnabled = false,
  webLoggerEnabled = false,
  webMessageOptions = {
    flushIntervalMs: 100,
    keepOnlyLastMessagePerType: true,
  },
}: MapProviderProps) => {
  // Refs.
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  // States.
  const [isMessageListenerReady, setIsMessageListenerReady] = useState(false)
  // - Global.
  const { setWebView, webWorldSessionKey } = useMapAtoms()
  // Theme.
  const styles = useStyles()
  // Behaviors.
  const { stableNativeScripts, stableCssStyles } =
    useStableNativeScriptsAndCssStyles(nativeScripts, cssStyles)
  const { handler } = useWebMessageHandler()
  useEnableDisableRNLogger(rnLoggerEnabled)
  useFlushMessagesOnMapMounted()
  const { cssStylesInjectionScript } =
    useCssStylesInjectionScript(stableCssStyles)
  const { webLoggerEnabledInjectionScript } =
    useWebLoggerEnabledInjectionScript(webLoggerEnabled)
  const { messageOptionsInjectionScript } =
    useMessageOptionsInjectionScript(webMessageOptions)
  useInjectJavaScriptIfScriptChanged(cssStylesInjectionScript)
  useInjectJavaScriptIfScriptChanged(webLoggerEnabledInjectionScript)
  useInjectJavaScriptIfScriptChanged(messageOptionsInjectionScript)
  useInjectJavaScriptIfAScriptChanged(stableNativeScripts)

  const injectedJavaScriptBeforeContentLoaded = useMemo(
    () =>
      [
        cssStylesInjectionScript,
        webLoggerEnabledInjectionScript,
        messageOptionsInjectionScript,
      ]
        .filter(Boolean)
        .join(';'),
    [
      cssStylesInjectionScript,
      webLoggerEnabledInjectionScript,
      messageOptionsInjectionScript,
    ],
  )

  const sourceDoc = useMemo(
    () =>
      createIframeSrcDoc(
        WEBVIEW_STATIC_HTML,
        injectedJavaScriptBeforeContentLoaded,
      ),
    [injectedJavaScriptBeforeContentLoaded],
  )

  const transport = useMemo<MapProviderWebViewTransport>(
    () => ({
      postMessage: (data: string) => {
        iframeRef.current?.contentWindow?.postMessage(data, '*')
      },
      injectJavaScript: (script: string) => {
        try {
          ;(iframeRef.current?.contentWindow as any)?.eval?.(script)
        } catch (_) {}
      },
    }),
    [],
  )

  useEffect(() => {
    // Install the listener first, then render the iframe to avoid missing the
    // initial "ready" message.
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) {
        return
      }
      if (typeof event.data !== 'string') {
        return
      }
      handler({
        nativeEvent: {
          data: event.data,
        },
      })
    }

    window.addEventListener('message', onMessage)
    setIsMessageListenerReady(true)

    return () => {
      window.removeEventListener('message', onMessage)
      setIsMessageListenerReady(false)
    }
  }, [handler])

  useEffect(() => {
    setWebView(transport)
    return () => {
      setWebView(null)
    }
  }, [setWebView, transport])

  return (
    <View style={[styles.container, style]}>
      {isMessageListenerReady ? (
        <iframe
          key={'map-provider-webview-session-' + webWorldSessionKey}
          ref={iframeRef}
          data-testid={'map-provider-webview'}
          srcDoc={sourceDoc}
          style={
            StyleSheet.flatten([
              styles.webView,
              { borderWidth: 0 },
              webViewStyle,
            ]) as CSSProperties
          }
          title={'map-provider-webview'}
        />
      ) : null}
      {children}
    </View>
  )
}

export default MapProvider
