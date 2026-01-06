import { StyleSheet } from 'react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type {
  MessageFromWebToRNHandlers,
  WebMessageOptions,
} from './MapProvider.types'
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

          let messages

          if (message?.type === 'batch') {
            messages = message.payload.messages
          } else {
            messages = [message]
          }

          messages?.forEach((item) => {
            const handler = handlers[item.type] as
              | ((m: MessageFromWebToRN) => void)
              | undefined
            handler?.(item)
          })
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

export const useEnableDisableRNLogger = (isEnabled: boolean) => {
  useEffect(() => {
    if (isEnabled) {
      RNLogger.enable()
    } else {
      RNLogger.disable()
    }
  }, [isEnabled])
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
 * @param cssStyles - The CSS to be made available within the webview.
 * @returns - A script to provide the given parameters to the Web world, using
 *  a format that can be injected into the WebView.
 */
export const useCssStylesInjectionScript = (cssStyles?: string | string[]) => {
  const cssStylesInjectionScript = useMemo(() => {
    const normalizedCss = normalizeCss(cssStyles)
    return normalizedCss ? buildCssInjectionScript(normalizedCss) : undefined
  }, [cssStyles])
  return { cssStylesInjectionScript }
}

/**
 * @param isEnabled - True if the web logger should be enabled.
 * @returns - A script to provide the given parameters to the Web world, using
 *  a format that can be injected into the WebView.
 */
export const useWebLoggerEnabledInjectionScript = (isEnabled?: boolean) => {
  const webLoggerEnabledInjectionScript = useMemo(
    () =>
      `(function(){
          try{
            window.__RNML_WEBLOGGER_ENABLED=${isEnabled};
          } catch(_){ }
          return true;
        })()`,
    [isEnabled],
  )
  return { webLoggerEnabledInjectionScript }
}

/**
 * @param messageOptions - The message options to be used by the webview.
 * @returns - A script to provide the given parameters to the Web world, using
 *  a format that can be injected into the WebView.
 */
export const useMessageOptionsInjectionScript = (
  messageOptions: WebMessageOptions,
) => {
  const messageOptionsInjectionScript = useMemo(
    () =>
      `(function(){
          try{
            window.__RNML_MESSAGEOPTIONS_FLUSHINTERVALMS=${messageOptions.flushIntervalMs};
            window.__RNML_MESSAGEOPTIONS_KEEPONLYLASTMESSAGEPERTYPE=${messageOptions.keepOnlyLastMessagePerType};
          } catch(_){ }
          return true;
        })()`,
    [messageOptions],
  )
  return { messageOptionsInjectionScript }
}

/**
 * Inject the given script into the WebView if it changed.
 * @param script - A script to be injected into the WebView.
 */
export const useInjectJavaScriptIfScriptChanged = (script?: string) => {
  // Refs.
  const lastInjectedScriptRef = useRef<string | null>(null)
  // States.
  // - Global.
  const { webView, isWebWorldReady } = useMapAtoms()

  useEffect(() => {
    if (
      !script ||
      !isWebWorldReady ||
      !webView ||
      lastInjectedScriptRef.current === script
    ) {
      return
    }
    webView?.injectJavaScript(script)
    lastInjectedScriptRef.current = script
  }, [script, isWebWorldReady, webView])
}
