import RNMapLibreGlJs from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import type { MarkerMethods } from 'react-native-maplibre-gl-js/react-native/components/Marker/Marker.types'
import type { PopupMethods } from 'react-native-maplibre-gl-js/react-native/components/Popup/Popup.types'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'

/**
 * @returns - Example of the marker component usage, with an attached popup.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerMethods>(null)
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
      <RNMapLibreGlJs.Marker
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
            rnListener: () => {
              if (!popupRef.current) {
                return
              }
              popupRef.current.setText(`A popup attached to the marker`).then()
              markerRef.current?.setLngLat(COORDINATE_DEFAULT_1)
              markerRef.current?.setPopup(popupRef.current.getId())
              // Now, when you click on the marker, the popup will open.
              // Then you can drag the marker and the popup will follow.
            },
          },
        }}
      />
      <RNMapLibreGlJs.Popup
        ref={popupRef}
        options={{
          closeButton: false,
        }}
      />
    </RNMapLibreGlJs.MapProvider>
  )
}

export default Screen
