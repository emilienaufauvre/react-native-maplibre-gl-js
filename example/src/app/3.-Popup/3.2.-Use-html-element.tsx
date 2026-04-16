import {
  Map,
  MapProvider,
  Marker,
  Popup,
  type PopupRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the Popup component usage, with a custom HTML element.
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
          closeButton: false,
          closeOnClick: false,
          element: {
            innerHTML: `
              <style>
                /* Remove default popup background. */
                .maplibregl-popup-content {
                  background: transparent;
                  padding: 0;
                  box-shadow: none;
                  border-radius: 0;
                }
                /* Remove default popup arrow. */
                .maplibregl-popup-tip {
                  display: none;
                }
                /* Declare our custom popup styles. */
                .popup {
                  border-radius: 32px;
                  padding: 8px;
                  text-align: center;
                  background-color: #FFF;
                }
                .popup-content {
                  padding: 8px;
                }
                .popup-content-title {
                  font-size: 18px;
                  font-weight: 700;
                }
              </style>
              <div id="popup" class="popup">
                <div class="popup-content">
                  <div class="popup-content-title">Hey this is a popup</div>
                </div>
              </div>
            `,
            // Define listeners for specific inner HTML of the popup. This
            // section is specific to the inner HTML of the popup and is
            /// different from the listeners defined on the popup itself (see
            // component basics example).
            listeners: [
              {
                eventName: 'click',
                cssSelector: '#popup',
                callback: () => console.log('Popup HTML clicked'),
              },
            ],
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              popupRef.current?.setLngLat([2.32, 48.87])
              popupRef.current?.addTo()
            },
          },
        }}
      />
      <Marker
        options={{
          coordinate: [2.32, 48.86],
          element: {
            innerHTML: `
              <style>
                .marker {
                  border-radius: 32px;
                  padding: 8px;
                  text-align: center;
                  background-color: #0074D9;
                }
                .marker-title {
                  font-size: 18px;
                  font-weight: 700;
                  color: #FFF;
                }
              </style>
              <div class="marker">
                <div class="marker-title">Click this marker</div>
              </div>
            `,
          },
        }}
        listeners={{
          click: {
            // On click on this marker, modify the popup HTML element.
            elementListener: () => {
              popupRef.current?.setDOMContent({
                innerHTML: `
                  <style>
                    /* Keep everything like in the default element, but change
                       the popup background color. */
                    .maplibregl-popup-content {
                      background: transparent;
                      padding: 0;
                      box-shadow: none;
                      border-radius: 0;
                    }
                    .maplibregl-popup-tip {
                      display: none;
                    }
                    .popup {
                      border-radius: 32px;
                      padding: 8px;
                      text-align: center;
                      background-color: red;
                    }
                    .popup-content {
                      padding: 8px;
                    }
                    .popup-content-title {
                      font-size: 18px;
                      font-weight: 700;
                      color: #FFF;
                    }
                  </style>
                  <div id="popup" class="popup">
                    <div class="popup-content">
                      <div class="popup-content-title">Hey this is a popup</div>
                    </div>
                  </div>
                `,
                listeners: [
                  {
                    eventName: 'click',
                    cssSelector: '#popup',
                    callback: () =>
                      console.log('Popup HTML clicked with new listener'),
                  },
                ],
              })
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
