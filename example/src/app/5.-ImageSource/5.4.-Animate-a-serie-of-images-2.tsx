import { MapProvider, Map, ImageSource } from 'react-native-maplibre-gl-js'
import { useEffect, useState } from 'react'

/**
 * @returns - Example of the ImageSource component usage, with an animation of
 *  multiple images, one after the other, implemented using setInterval.
 */
const Screen = () => {
  // Animation to change the current image at regular intervals.
  const FRAME_COUNT = 10
  const [currentImage, setCurrentImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevState) => (prevState + 1) % FRAME_COUNT)
    }, 200)
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
          url: `https://placehold.co/600x600.png?text=Frame+${currentImage}`,
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
