import { useEffect, useState } from 'react'
import { assetToDataUri } from './useLocalImage.utils'

/**
 * Load a local image as base64 data URI, and return it.
 * @param moduleId - The module ID of the image to load (e.g.
 *  `require('./image.png')`).
 * @returns - The base64 data URI of the image.
 * @example
 * ```tsx
 * const image = useLocalImage(require('./image.png'))
 * ```
 * @group Hooks
 */
const useLocalImage = (moduleId: number) => {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    assetToDataUri(moduleId).then((uri) => {
      setImage(uri)
    })
  }, [moduleId])

  return image
}

export default useLocalImage
