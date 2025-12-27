import { Asset } from 'expo-asset'

const guessMime = (uri: string) => {
  if (/\.png($|\?)/i.test(uri)) {
    return 'image/png'
  }
  if (/\.jpe?g($|\?)/i.test(uri)) {
    return 'image/jpeg'
  }
  if (/\.webp($|\?)/i.test(uri)) {
    return 'image/webp'
  }
  if (/\.svg($|\?)/i.test(uri)) {
    return 'image/svg+xml'
  }
  return 'application/octet-stream'
}

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      resolve(dataUrl.split(',')[1] ?? '')
    }
    reader.readAsDataURL(blob)
  })

export const assetToDataUri = async (id: number) => {
  const asset = Asset.fromModule(id)
  await asset.downloadAsync()

  const uri = asset.localUri ?? asset.uri
  const res = await fetch(uri)
  const blob = await res.blob()
  const base64 = await blobToBase64(blob)
  const mime = guessMime(uri)

  return `data:${mime};base64,${base64}`
}
