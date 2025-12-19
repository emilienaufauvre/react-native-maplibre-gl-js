import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

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
   * The map elements (e.g., Map) as direct children.
   */
  children?: ReactNode
}
