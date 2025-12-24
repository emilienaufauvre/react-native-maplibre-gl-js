import type { MessageFromRNToWeb } from '../../communication/messages.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type {
  MapSourceId,
  MapSourceLayerWithSourceId,
  MapSourceProps,
} from '../../react-native/components-factories/map-sources/createMapSourceAsComponent.types'
import maplibregl, { type LayerSpecification } from 'maplibre-gl'

export default class MapSourcesController {
  #sources = new Map<string, MapSourceProps<any>>()

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceMount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    map.addSource(message.payload.id, message.payload.source)
    message.payload.layers.forEach(
      ({
        layer,
        beforeId,
      }: {
        layer: Omit<MapSourceLayerWithSourceId, 'source'>
        beforeId?: string
      }) => {
        map.addLayer(
          {
            source: message.payload.id,
            ...layer,
          } as maplibregl.AddLayerObject,
          beforeId,
        )
      },
    )
    // Save the source.
    this.#sources.set(message.payload.id, message.payload)
    // Send the "mount" event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'mapSourceListenerEvent',
      payload: {
        sourceId: message.payload.id,
        eventName: 'mount',
      },
    })
  }

  handleUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUnmount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const source = this.#sources.get(message.payload.sourceId)
    if (!source) {
      return
    }
    // Remove the source and its layers from the map.
    this.#removeSourceAndItsLayers(map, message.payload.sourceId)
    this.#sources.delete(message.payload.sourceId)
    // Send the "unmount" event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'mapSourceListenerEvent',
      payload: {
        sourceId: message.payload.sourceId,
        eventName: 'unmount',
      },
    })
  }

  /**
   * Safe removal of the source and its layers from the map.
   * @param map - The map where the source and its layers are located.
   * @param sourceId - The ID of the source to remove.
   */
  #removeSourceAndItsLayers(map: maplibregl.Map, sourceId: MapSourceId) {
    const style = map.getStyle()

    if (style && style.layers) {
      const layerIds = style.layers
        .filter(
          (layer): layer is LayerSpecification & { source: string } =>
            'source' in layer && layer.source === sourceId,
        )
        .map((layer) => layer.id)
      layerIds.forEach((id) => {
        if (map.getLayer(id)) {
          map.removeLayer(id)
        }
      })
    }

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId)
    }
  }
}
