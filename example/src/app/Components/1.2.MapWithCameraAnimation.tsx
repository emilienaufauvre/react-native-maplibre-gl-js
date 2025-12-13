import RNMapLibreGlJs from 'react-native-maplibre-gl-js'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'
import { useRef } from 'react'
import type { MapMethods } from 'react-native-maplibre-gl-js/react-native/components/Map/Map.types'
import type { MarkerMethods } from 'react-native-maplibre-gl-js/react-native/components/Marker/Marker.types'

/**
 * @returns - Example of the map component usage.
 */
const Screen = () => {
  // Refs.
  const mapRef = useRef<MapMethods>(null)
  const markerRef = useRef<MarkerMethods>(null)

  return (
    <RNMapLibreGlJs.MapProvider>
      <RNMapLibreGlJs.Map
        ref={mapRef}
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
          zoom: 12,
          minZoom: 3,
          maxPitch: 60,
        }}
      />
      <RNMapLibreGlJs.Marker
        ref={markerRef}
        listeners={{
          mount: {
            rnListener: () => {
              markerRef.current?.setLngLat(COORDINATE_DEFAULT_1)
            },
          },
          // If marker clicked, go to NYC with a smooth animation.
          click: {
            elementListener: () => {
              mapRef.current?.flyTo({
                center: [-74.006111, 40.712778],
                zoom: 9,
                speed: 0.2,
                curve: 1,
                duration: 5000,
                pitch: 60,
              })
            },
          },
        }}
      />
    </RNMapLibreGlJs.MapProvider>
  )
}

export default Screen
