import {
  MapProvider,
  Map,
  Marker,
  Popup,
  type MarkerRef,
  type PopupRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'

/**
 * @returns - Example of the marker component usage, with a detached popup.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef>(null)
  const popupRef = useRef<PopupRef>(null)

  return (
    <MapProvider>
      <Map
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
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
            tagName: 'div',
            innerHTML: `
                <style>
                  .no-margin * {
                    margin: 0;
                  }
                </style>
                <div
                  class="no-margin"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    aspect-ratio: 1;
                    padding: 4px;
                    border-radius: 50%;
                    background-color: #FFF;
                    box-shadow: 0 0 10px #000A;
                  "
                >
                  <h1>📍</h1>
                </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () =>
              markerRef.current?.setLngLat(COORDINATE_DEFAULT_1),
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
              // Note: if you drag the marker, the popup won't follow. It is not
              // attached to the marker.
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
