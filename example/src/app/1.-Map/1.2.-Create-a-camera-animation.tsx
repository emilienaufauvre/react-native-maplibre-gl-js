import {
  MapProvider,
  Map,
  Marker,
  type MapRef,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the map component usage.
 */
const Screen = () => {
  // Refs.
  const mapRef = useRef<MapRef | null>(null)
  const markerRef = useRef<MarkerRef | null>(null)

  return (
    <MapProvider>
      <Map
        ref={mapRef}
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
          minZoom: 3,
          maxPitch: 60,
        }}
      />
      <Marker
        ref={markerRef}
        listeners={{
          mount: {
            rnListener: () => {
              markerRef.current?.setLngLat([2.32, 48.86])
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
    </MapProvider>
  )
}

export default Screen
