import {
  MapProvider,
  Map,
  Marker,
  Popup,
  type MarkerRef,
  type PopupRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage, with an attached popup.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef>(null)
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
      <Marker
        ref={markerRef}
        options={{
          draggable: true,
          element: {
            tagName: 'div',
            innerHTML: `
              <style>
                .pin {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 32px;
                  height: 32px;
                  padding: 4px;
                  margin: 0;
                  border-radius: 50%;
                  background-color: #FFF;
                  box-shadow: 0 0 10px #000A;
                }
              </style>
              <div class="pin">
                <h1>📍</h1>
              </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              if (!popupRef.current) {
                return
              }
              popupRef.current.setText(`A popup attached to the marker`).then()
              markerRef.current?.setLngLat([2.32, 48.86])
              markerRef.current?.setPopup(popupRef.current.getId())
              // Now, when you click on the marker, the popup will open.
              // Then you can drag the marker and the popup will follow.
            },
          },
        }}
      />
      <Popup
        ref={popupRef}
        options={{
          closeButton: false,
        }}
      />
    </MapProvider>
  )
}

export default Screen
