import { MapProvider, Map, type MapRef } from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the map component usage, with a globe projection that
 * makes the space not visible.
 */
const Screen = () => {
  // Refs.
  const mapRef = useRef<MapRef>(null)

  return (
    <MapProvider>
      <Map
        ref={mapRef}
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
          // Settings to avoid being able to see the whole globe (with the space
          // behind).
          minZoom: 4,
          maxPitch: 60,
        }}
        listeners={{
          mount: {
            rnListener: () => {
              mapRef.current?.setProjection({ type: 'globe' })
            },
          },
          move: {
            objectListener: async () => {
              const zoom = await mapRef.current?.getZoom()
              const pitch = await mapRef.current?.getPitch()
              const lowestZoomThreshold = 8
              const maxPitchAtLowestZooms = 5
              const maxPitchAtHighestZooms = 60

              if ((zoom ?? 1) < lowestZoomThreshold) {
                // If we are at a low zoom (where the space could be seen),
                // and if the map is pitched, un-pitch the map. Also disable the
                // pitch.
                // Note: the max pitch threshold is not 0 to allow a smooth
                // transition with easeTo.
                if ((pitch ?? 0) > maxPitchAtLowestZooms)
                  mapRef.current?.easeTo({
                    pitch: 0,
                    duration: 200,
                  })
                mapRef.current?.setMaxPitch(maxPitchAtLowestZooms)
              } else {
                // Otherwise, enable back the pitch.
                mapRef.current?.setMaxPitch(maxPitchAtHighestZooms)
              }
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
