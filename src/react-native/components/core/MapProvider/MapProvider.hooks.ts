import { StyleSheet } from 'react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { MessageFromWebToRNHandlers } from './MapProvider.types'
import type { WebViewMessageEvent } from 'react-native-webview'
import RNLogger from '../../../logger/rn-logger'
import type { MessageFromWebToRN } from '../../../../communication/messages.types'
import {
  isWebObjectListenerOnHTMLElement,
  isWebObjectListenerOnMapLayer,
  isWebObjectListenerOnObject,
  isWebObjectListenerOnRN,
} from '../../../../communication/messages.utils'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type {
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnMapLayer,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
} from '../../../components-factories/web-objects/createWebObjectAsComponent.types'
import { buildCssInjectionScript, normalizeCss } from './MapProvider.utils'

export const useStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%', height: '100%', overflow: 'hidden' },
        webView: { flex: 1, backgroundColor: 'transparent' },
      }),
    [],
  )
}

/**
 * On start, the map must be mounted before any other map element. When the
 * mount message of the map is ready, we flush all the pending messages to
 * the web world.
 */
export const useFlushMessagesOnMapMounted = () => {
  // States.
  // - Global.
  const { isMapMountMessageReady, flushMessages } = useMapAtoms()

  useEffect(() => {
    if (isMapMountMessageReady) {
      flushMessages()
    }
  }, [flushMessages, isMapMountMessageReady])
}

/**
 * @returns - The handler that will receive the messages from the web world.
 */
export const useWebMessageHandler = () => {
  // States.
  // - Global.
  const {
    setIsWebWorldReady,
    getWebObjectListeners,
    getMapSourceListeners,
    resolveWebObjectPendingMethodResponse,
  } = useMapAtoms()

  const createWebViewMessageHandler = useCallback(
    (handlers: MessageFromWebToRNHandlers) => {
      // Not an anonymous function => get the function name for logger.
      return function handleMessage(event: WebViewMessageEvent) {
        try {
          RNLogger.debug('RN', handleMessage.name, event?.nativeEvent?.data)
          const message = JSON.parse(
            event.nativeEvent.data,
          ) as MessageFromWebToRN
          const handler = handlers[message.type] as
            | ((m: MessageFromWebToRN) => void)
            | undefined
          return handler?.(message)
        } catch (error: any) {
          RNLogger.error('RN', handleMessage.name, error.message)
        }
      }
    },
    [],
  )

  // Handle the messages from the web world by dispatching the message to the
  // corresponding handler.
  const handler = useMemo(() => {
    return createWebViewMessageHandler({
      console: ({
        payload: { args, level },
      }: Extract<MessageFromWebToRN, { type: 'console' }>) => {
        RNLogger[level]('Web', args[0], ...args.slice(1))
      },
      ready: () => {
        setIsWebWorldReady(true)
      },
      webObjectListenerEvent: ({
        payload: { objectId, eventName, event },
      }: Extract<MessageFromWebToRN, { type: 'webObjectListenerEvent' }>) => {
        // Retrieve the corresponding object listener.
        const listener = getWebObjectListeners({
          objectId,
        })?.[eventName]
        // Then, call it.
        if (isWebObjectListenerOnRN(listener)) {
          ;(listener as WebObjectListenerOnRN<any>).rnListener(event)
        }
        if (isWebObjectListenerOnObject(listener)) {
          ;(listener as WebObjectListenerOnObject<any>).objectListener(event)
        }
        if (isWebObjectListenerOnMapLayer(listener)) {
          ;(listener as WebObjectListenerOnMapLayer<any>).layerListener(event)
        }
        if (isWebObjectListenerOnHTMLElement(listener)) {
          ;(listener as WebObjectListenerOnHTMLElement<any>).elementListener(
            event,
          )
        }
      },
      webObjectMethodResponse: ({
        payload: { requestId, result },
      }: Extract<MessageFromWebToRN, { type: 'webObjectMethodResponse' }>) => {
        resolveWebObjectPendingMethodResponse({
          requestId,
          result,
        })
      },
      mapSourceListenerEvent: ({
        payload: { sourceId, layerId, eventName, event },
      }: Extract<MessageFromWebToRN, { type: 'mapSourceListenerEvent' }>) => {
        // Retrieve the corresponding object listener.
        const listener = getMapSourceListeners({
          sourceId,
          layerId,
        })?.[eventName]
        // Then, call it.
        listener?.(event)
      },
    })
  }, [
    createWebViewMessageHandler,
    setIsWebWorldReady,
    getWebObjectListeners,
    getMapSourceListeners,
    resolveWebObjectPendingMethodResponse,
  ])

  return { handler }
}

/**
 * @param cssStyles - The CSS to be injected.
 * @returns - The given CSS in a format that can be injected into the WebView.
 */
export const useCssInjectionScript = (cssStyles?: string | string[]) => {
  const cssInjectionScript = useMemo(() => {
    const normalizedCss = normalizeCss(cssStyles)
    return normalizedCss ? buildCssInjectionScript(normalizedCss) : undefined
  }, [cssStyles])
  return { cssInjectionScript }
}

/**
 * Inject the given script into the WebView if it changed.
 * @param cssInjectionScript - A script that injects CSS once executed within
 *  the WebView.
 */
export const useInjectJavaScriptIfCssStylesChanged = (
  cssInjectionScript?: string,
) => {
  // Refs.
  const lastInjectedScriptRef = useRef<string | null>(null)
  // States.
  // - Global.
  const { webView, isWebWorldReady } = useMapAtoms()

  useEffect(() => {
    if (
      !cssInjectionScript ||
      !isWebWorldReady ||
      !webView ||
      lastInjectedScriptRef.current === cssInjectionScript
    ) {
      return
    }
    webView?.injectJavaScript(cssInjectionScript)
    lastInjectedScriptRef.current = cssInjectionScript
  }, [cssInjectionScript, isWebWorldReady, webView])
}
