import RNMapLibreGlJs from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import type { PopupMethods } from 'react-native-maplibre-gl-js/react-native/components/Popup/Popup.types'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'

/**
 * @returns - Example of the Popup component usage.
 */
const Screen = () => {
  // Refs.
  const popupRef = useRef<PopupMethods>(null)

  return (
    <RNMapLibreGlJs.MapProvider>
      <RNMapLibreGlJs.Map
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
          zoom: 12,
        }}
      />
      <RNMapLibreGlJs.Popup
        ref={popupRef}
        options={{
          closeButton: true,
        }}
        listeners={{
          mount: {
            rnListener: () => {
              // The popup is opened once the coordinates are set.
              popupRef.current?.setLngLat(COORDINATE_DEFAULT_1)
              // Then it is closed before the text is set.
              popupRef.current?.setText('This is a popup')
              // And finally, it is opened again because the text is set.
            },
          },
          open: {
            objectListener: () => console.log('Popup opened'),
          },
          close: {
            objectListener: () => console.log('Popup closed'),
          },
        }}
      />
    </RNMapLibreGlJs.MapProvider>
  )
}

export default Screen
