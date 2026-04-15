import {
  Map,
  MapProvider,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage, with listeners on an inner
 *  HTML element.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef | null>(null)

  const buttonColor = '#007AFF'
  const buttonColorSelected = '#A5CDFF'

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
          coordinate: [2.32, 48.86],
          draggable: true,
          // The element to be used as the marker (a descriptor of an
          // HTMLElement).
          element: {
            innerHTML: `
              <style>
                .pin {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 4px;
                  margin: 0;
                  border-radius: 20px;
                  background-color: #FFF;
                  box-shadow: 0 0 10px #000A;
                }
                .button {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 16px;
                  padding: 8px;
                  border-radius: 16px;
                  font-weight: bold;
                  background-color: ${buttonColor};
                  color: #FFF;
                }
              </style>
              <div class="pin">
                <!--
                Update the background color of the button when it is pressed.
                -->
                <div
                  class="button"
                  onmousedown="this.style.background='${buttonColorSelected}'"
                  onmouseup="this.style.background='${buttonColor}'"
                  onmouseleave="this.style.background='${buttonColor}'"
                  ontouchstart="this.style.background='${buttonColorSelected}'"
                  ontouchend="this.style.background='${buttonColor}'"
                >
                  Click me 1
                </div>
                <h1>📍</h1>
                <!--
                Update the background color of the button when it is pressed.
                -->
                <div
                  id="click-me-2"
                  class="button"
                  onmousedown="this.style.background='${buttonColorSelected}'"
                  onmouseup="this.style.background='${buttonColor}'"
                  onmouseleave="this.style.background='${buttonColor}'"
                  ontouchstart="this.style.background='${buttonColorSelected}'"
                  ontouchend="this.style.background='${buttonColor}'"
                >
                  Click me 2
                </div>
              </div>`,
            // Define listeners for specific inner HTML of the marker. This
            // section is specific to the inner HTML of the marker and is
            /// different from the listeners defined on the marker itself (see
            // component basics example).
            listeners: [
              // Listen for clicks on both buttons using a selection on class.
              {
                eventName: 'click',
                cssSelector: '.button',
                callback: () => console.log('Marker inner HTML button clicked'),
              },
              // Listen for clicks on the second button using its ID.
              {
                eventName: 'click',
                cssSelector: '#click-me-2',
                callback: () => console.log('Button 2 clicked'),
              },
            ],
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
