import {
  MapProvider,
  Map,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import { type LngLatLike } from 'maplibre-gl'
import {
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'

/**
 * @returns - Example of the marker component usage, with an animation.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef>(null)
  // Animation to smoothly update the marker coordinate.
  const markerLng = useSharedValue(0)
  const markerLat = useSharedValue(0)
  const updateMarkerCoordinate = (lngLat: LngLatLike) => {
    markerRef.current?.setLngLat(lngLat)
  }
  useAnimatedReaction(
    (): LngLatLike => {
      return [markerLng.value, markerLat.value]
    },
    (coords) => {
      scheduleOnRN(updateMarkerCoordinate, coords)
    },
  )

  return (
    <MapProvider>
      <Map
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
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
          // If marker clicked, animate it to a new random position.
          click: {
            elementListener: async (_) => {
              const lngLat = await markerRef.current?.getLngLat()
              if (!lngLat) {
                return
              }
              // /!\ Remember to update the "from" value before animating to
              // make the animation start at the real marker coordinates (it may
              // have been dragged before).
              markerLng.value = lngLat.lng
              markerLat.value = lngLat.lat
              // Animate to the new position (a random one).
              markerLng.value = withTiming(
                lngLat.lng + (Math.random() - 0.5) / 50,
                {
                  duration: 1000,
                },
              )
              markerLat.value = withTiming(
                lngLat.lat + (Math.random() - 0.5) / 50,
                {
                  duration: 1000,
                },
              )
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
