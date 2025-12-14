import { View } from 'react-native'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import { WEBVIEW_STATIC_HTML } from 'react-native-maplibre-gl-js/web/generated/webview_static_html'
import type { MessageFromWebToRN } from 'react-native-maplibre-gl-js/communication/messages.types'
import RNLogger from 'react-native-maplibre-gl-js/react-native/logger/rn-logger'
import useMapAtoms from 'react-native-maplibre-gl-js/react-native/hooks/atoms/useMapAtoms'
import {
  isWebObjectListenerOnHTMLElement,
  isWebObjectListenerOnMapLayer,
  isWebObjectListenerOnObject,
  isWebObjectListenerOnRN,
} from 'react-native-maplibre-gl-js/communication/messages.utils'
import { useStyles } from 'react-native-maplibre-gl-js/react-native/components/MapProvider/MapProvider.hooks'
import { useCallback, useEffect } from 'react'
import type {
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnMapLayer,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'
import type { MapProviderProps } from 'react-native-maplibre-gl-js/react-native/components/MapProvider/MapProvider.types'

/**
 * Provide the main
 * @param props -
 * @group Components
 */
const MapProvider = ({ children }: MapProviderProps) => {
  // States.
  // - Global.
  const {
    setWebView,
    setIsWebWorldReady,
    isMapMountMessageReady,
    flushMessages,
    getWebObjectListeners,
    resolveWebObjectPendingMethodResponse,
  } = useMapAtoms()
  // Theme.
  const styles = useStyles()

  // On start, the map must be mounted before any other map element. When the
  // mount message of the map is ready, we flush all the pending messages to
  // the web world.
  useEffect(() => {
    if (isMapMountMessageReady) {
      flushMessages()
    }
  }, [flushMessages, isMapMountMessageReady])

  // Handler of messages from the web world.
  const onMessage = useCallback(
    // Not an anonymous function => get the function name for logger.
    function handleMessage(event: WebViewMessageEvent) {
      try {
        RNLogger.debug('RN', handleMessage.name, event?.nativeEvent?.data)
        const message = JSON.parse(event.nativeEvent.data) as MessageFromWebToRN

        switch (message.type) {
          case 'console': {
            RNLogger[message.payload.level](
              'Web',
              message.payload.args[0],
              ...message.payload.args.slice(1),
            )
            break
          }
          case 'ready': {
            setIsWebWorldReady(true)
            break
          }
          case 'webObjectListenerEvent': {
            // Retrieve the corresponding object listener.
            const listener = getWebObjectListeners({
              objectId: message.payload.objectId,
            })?.[message.payload.eventName]
            // Then, call it.
            if (isWebObjectListenerOnRN(listener)) {
              ;(listener as WebObjectListenerOnRN<any>).rnListener(
                message.payload.event,
              )
            }
            if (isWebObjectListenerOnObject(listener)) {
              ;(listener as WebObjectListenerOnObject<any>).objectListener(
                message.payload.event,
              )
            }
            if (isWebObjectListenerOnMapLayer(listener)) {
              ;(listener as WebObjectListenerOnMapLayer<any>).layerListener(
                message.payload.event,
              )
            }
            if (isWebObjectListenerOnHTMLElement(listener)) {
              ;(
                listener as WebObjectListenerOnHTMLElement<any>
              ).elementListener(message.payload.event)
            }
            break
          }
          case 'webObjectMethodResponse': {
            resolveWebObjectPendingMethodResponse({
              requestId: message.payload.requestId,
              result: message.payload.result,
            })
            break
          }
        }
      } catch (error: any) {
        RNLogger.error('RN', handleMessage.name, error.message)
      }
    },
    [
      setIsWebWorldReady,
      getWebObjectListeners,
      resolveWebObjectPendingMethodResponse,
    ],
  )

  return (
    <View style={styles.container}>
      <WebView
        ref={setWebView}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        allowFileAccess={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode={'always'}
        onMessage={onMessage}
        source={{ html: WEBVIEW_STATIC_HTML }}
      />
      {children}
    </View>
  )
}

export default MapProvider
