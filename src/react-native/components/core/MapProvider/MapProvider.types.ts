import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { MessageFromWebToRN } from '../../../../communication/messages.types'

/**
 * MapProvider component props.
 * @interface
 * @group Types (web objects)
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
   * CSS (or list of CSS) to inject globally into the WebView document head.
   * Useful to share classes/animations across Marker components and/or other
   * elements that use HTMLElement (descriptors).
   */
  cssStyles?: string | string[]
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
   */
  webMessageOptions?: WebMessageOptions
  /**
   * The map elements (e.g., Map) as direct children.
   */
  children?: ReactNode
}

/**
 * Options on how messages from the Web are buffered and dispatched to RN.
 * @interface
 * @group Types (web objects)
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
   * If false, all messages are kept in the buffer, this may impact performances
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
