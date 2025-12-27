import { MapProvider, Map, ImageSource } from 'react-native-maplibre-gl-js'
import { useEffect, useRef, useState } from 'react'

/**
 * @returns - Example of the ImageSource component usage, with an animation of
 *  multiple images, one after the other, implemented using setInterval.
 */
const Screen = () => {
  // Animation to change the current image at regular intervals.
  // DirectionRef is used to make the animation loop with a ping-pong effect.
  const FRAME_COUNT = 5
  const directionRef = useRef<1 | -1>(1)
  const [currentImage, setCurrentImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        let next = prev + directionRef.current
        if (next === FRAME_COUNT - 1) {
          directionRef.current = -1
        }
        if (next === 0) {
          directionRef.current = 1
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.335, 48.865],
          zoom: 12,
        }}
      />
      <ImageSource
        id={'image-source'}
        source={{
          type: 'image',
          // The image is updated here.
          url: `https://maplibre.org/maplibre-gl-js/docs/assets/radar${
            currentImage
          }.gif`,
          coordinates: [
            [2.325984383759419, 48.87044351904299],
            [2.3517090282194317, 48.87044297931527],
            [2.351833890385791, 48.85134902326752],
            [2.3257573781646386, 48.85135618849253],
          ],
        }}
        layers={[
          {
            layer: {
              id: 'image-layer',
              type: 'raster',
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
