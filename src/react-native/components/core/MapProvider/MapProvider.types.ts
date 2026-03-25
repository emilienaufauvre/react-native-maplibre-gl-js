import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { MessageFromWebToRN } from '../../../../communication/messages.types'

/**
 * MapProvider component props.
 * @group Types (map provider)
 */
export type MapProviderProps = {
  /**
   * Style of the view.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style of the inner WebView.
   */
  webViewStyle?: StyleProp<ViewStyle>
  /**
   * CSS (or list of CSS) to be injected globally into the WebView document
   * head. Useful to share classes/animations across Marker components and/or
   * other elements that use HTMLElement (descriptors).
   * Examples can be found in the example app.
   */
  cssStyles?: string | string[]
  /**
   * A native script (or a list of them) to be injected into the WebView,
   * allowing you to add custom web functionality, improve performance for
   * frequently executed calls, or define web functions that are used by web
   * objects (e.g., the Map and its transformCameraUpdate option).
   * Some global objects are made available by default in the WebView context,
   * such as the maplibre-gl-js Map.
   * These globals are:
   * - `window.__RNML_CONTROLLER`: the main controller to interact with the map.
   * - `window.__RNML_BRIDGE`: the bridge to send messages to RN.
   * To be compliant with the injection mechanism, a script must be an IIFE that
   * returns true.
   * Examples can be found in the example app.
   */
  nativeScripts?: string | string[]
  /**
   * Enable logs originating from RN (RNLogger).
   * Default to false.
   */
  rnLoggerEnabled?: boolean
  /**
   * Enable logs originating from the Web (WebLogger).
   * Default to false.
   * When disabled, messages of the type "console" coming from the ebView are
   * ignored.
   * If enabled, performances may be impacted.
   */
  webLoggerEnabled?: boolean
  /**
   * Control how Web messages are buffered and dispatched.
   * These options define whether performance or delivery precision is
   * prioritized.
   * For example, if you want to ensure that your app state is always updated
   * with the all information and update history, you can set
   * `keepOnlyLastMessagePerType` to false. But if you only need the latest
   * update of a specific property, you can set `keepOnlyLastMessagePerType` to
   * true.
   * This can apply to web object listeners (e.g., Map "onmove" listener) that
   * are called frequently.
   * The same logic applies to the `flushIntervalMs` option, which defines how
   * often the buffered messages are flushed and sent to your app (e.g., Map
   * "onmove" event is received once every `flushIntervalMs`, and the listener
   * is executed accordingly).
   * Note: use native scripts to handle high-frequency tasks and updates.
   */
  webMessageOptions?: WebMessageOptions
  /**
   * The map elements (e.g., Map) as direct children.
   */
  children?: ReactNode
  /**
   * Callback when the WebView is reset (the process is terminated, reloaded,
   * etc.). Useful when to restore app states when the app is put in the
   * background and the OS kills the WebView. Note: the library automatically
   * recreates the Map and its components when the WebView is reset.
   * A basic usage could be to wait for the map to be re-mounted to restore its
   * state (e.g., center, zoom, pitch, bearing, etc.).
   '
   */
  onWebViewReset?: () => void
}

/**
 * Options on how messages from the Web are buffered and dispatched to RN.
 * @group Types (map provider)
 */
export type WebMessageOptions = {
  /**
   * Interval (in milliseconds) at which buffered messages from the Web are
   * flushed and sent as a batch.
   */
  flushIntervalMs?: number
  /**
   * When enabled, Web messages of the same type are deduplicated within the
   * buffer, keeping only the most recent message of each type before
   * dispatching.
   * This applies only to event messages (e.g., if a marker received two clicks
   * during the flush interval, only the last one is returned).
   * If false, all messages are kept in the buffer. This may impact performances
   * if a listener sends many messages of the same type quickly (e.g., the
   * "move" listener of a Map object).
   */
  keepOnlyLastMessagePerType?: boolean
}

/**
 * Assign a handler to each message type.
 */
export type MessageFromWebToRNHandlers = {
  [K in MessageFromWebToRN['type']]?: (
    message: Extract<MessageFromWebToRN, { type: K }>,
  ) => void
}
