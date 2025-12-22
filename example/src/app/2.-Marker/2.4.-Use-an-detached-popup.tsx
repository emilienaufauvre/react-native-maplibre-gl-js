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
 * @returns - Example of the marker component usage, with a detached popup.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef | null>(null)
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
      {
        // The popup is declared before the marker, so it is mounted first. This
        // way, when the marker is clicked, the popup is already mounted and
        // ready to be used.
      }
      <Popup
        ref={popupRef}
        listeners={{
          mount: {
            rnListener: async () => {
              popupRef.current?.setHTML(`
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                "
              >
                <strong>Marker clicked!</strong>
              </div>
            `)
            },
          },
        }}
      />
      <Marker
        ref={markerRef}
        options={{
          draggable: true,
          element: {
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
            rnListener: () => markerRef.current?.setLngLat([2.32, 48.86]),
          },
          click: {
            elementListener: async (_: MouseEvent) => {
              // Open the popup when on the marker coordinate when it is
              // clicked.
              const lngLat = await markerRef.current?.getLngLat()
              if (!lngLat) {
                return
              }
              popupRef.current?.setLngLat(lngLat)
              popupRef.current?.addTo()
              // Note: if you drag the marker, the popup won't follow. It is not
              // attached to the marker. One should implement drag listeners to
              // keep the popup in sync with the marker coordinate.
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
