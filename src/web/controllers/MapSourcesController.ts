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

  addExistingSourcesToMap = (
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#sources.entries().forEach(([, source]) => {
      if (map.isStyleLoaded()) {
        this.#addSourceAndItsLayers(source, reactNativeBridge, map)
      } else {
        map.once('load', () =>
          this.#addSourceAndItsLayers(source, reactNativeBridge, map),
        )
      }
    })
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceMount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const run = (mapReady: maplibregl.Map) => {
      // Add the source and its layers from the map.
      this.#addSourceAndItsLayers(message.payload, reactNativeBridge, mapReady)
      this.#sources.set(message.payload.id, message.payload)
    }
    // Need the map to be loaded before adding the source and its layers.
    if (map.isStyleLoaded()) {
      run(map)
    } else {
      map.once('load', () => run(map))
    }
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

  #addSourceAndItsLayers = (
    source: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    map.addSource(source.id, source.source)
    source.layers.forEach(
      ({
        layer,
        beforeId,
      }: {
        layer: Omit<MapSourceLayerWithSourceId, 'source'>
        beforeId?: string
      }) => {
        map.addLayer(
          {
            source: source.id,
            ...layer,
          } as maplibregl.AddLayerObject,
          beforeId,
        )
      },
    )
    // Send the "mount" event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'mapSourceListenerEvent',
      payload: {
        sourceId: source.id,
        eventName: 'mount',
      },
    })
  }

  #removeSourceAndItsLayers = (map: maplibregl.Map, sourceId: MapSourceId) => {
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
