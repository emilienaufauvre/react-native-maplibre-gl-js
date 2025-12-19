import {
  MapProvider,
  Map,
  Popup,
  type PopupRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the Popup component usage.
 */
const Screen = () => {
  // Refs.
  const popupRef = useRef<PopupRef>(null)

  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
      />
      <Popup
        ref={popupRef}
        options={{
          closeButton: true,
        }}
        listeners={{
          mount: {
            rnListener: () => {
              // The popup is opened once the coordinates are set.
              popupRef.current?.setLngLat([2.32, 48.86])
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
    </MapProvider>
  )
}

export default Screen
