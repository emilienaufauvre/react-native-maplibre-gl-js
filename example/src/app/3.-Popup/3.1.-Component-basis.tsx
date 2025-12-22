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
  const popupRef = useRef<PopupRef | null>(null)

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
              // Setup the popup properties.
              popupRef.current?.setLngLat([2.32, 48.86])
              popupRef.current?.setText('This is a popup')
              // And finally, open it (it's equivalent to addTo(map) in official
              // MapLibre GL JS docs).
              popupRef.current?.addTo()
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
