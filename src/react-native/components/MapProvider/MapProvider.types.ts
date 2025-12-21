import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { MessageFromWebToRN } from '../../../communication/messages.types'

/**
 * MapProvider component props.
 * @interface
 * @group Types
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
  injectedCss?: string | string[]
  /**
   * The map elements (e.g., Map) as direct children.
   */
  children?: ReactNode
}

/**
 * Assign a handler to each message type.
 */
export type MessageFromWebToRNHandlers = {
  [K in MessageFromWebToRN['type']]?: (
    message: Extract<MessageFromWebToRN, { type: K }>,
  ) => void
}
