import type { MessageFromRNToWeb } from '../../communication/messages.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type {
  MapSourceId,
  MapSourceLayer,
  MapSourceLayerListeners,
  MapSourceProps,
} from '../../react-native/components-factories/map-sources/createMapSourceAsComponent.types'
import maplibregl, { type LayerSpecification } from 'maplibre-gl'
import { stableStringify } from '../../react-native/hooks/atoms/useMapAtoms.utils'

/**
 *
 */
export default class MapSourcesController {
  #sources = new Map<string, MapSourceProps<any>>()

  /**
   * If the map object changed, add the existing sources and their layers to the
   * new map.
   * Note that everything must be recreated, including the listeners.
   * Send a mount event.
   */
  addExistingSourcesToMap = (
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#sources.entries().forEach(([, source]) => {
      if (map.isStyleLoaded()) {
        this.#addSourceAndItsLayers(source, reactNativeBridge, map)
        this.#setSourceListeners(source, reactNativeBridge, map)
      } else {
        map.once('load', () => {
          this.#addSourceAndItsLayers(source, reactNativeBridge, map)
          this.#setSourceListeners(source, reactNativeBridge, map)
        })
      }
    })
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceMount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const run = (mapReady: maplibregl.Map) => {
      this.#addSourceAndItsLayers(message.payload, reactNativeBridge, mapReady)
      this.#setSourceListeners(message.payload, reactNativeBridge, mapReady)
      this.#sources.set(message.payload.id, message.payload)
    }
    // Need the map to be loaded before adding the source and its layers.
    if (map.isStyleLoaded()) {
      run(map)
    } else {
      map.once('load', () => run(map))
    }
  }

  handleUpdateMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUpdate' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const run = (mapReady: maplibregl.Map) => {
      this.#updateSourceAndItsLayers(
        message.payload,
        reactNativeBridge,
        mapReady,
      )
      this.#setSourceListeners(message.payload, reactNativeBridge, mapReady)
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
    this.#removeSourceAndItsLayers(
      message.payload.sourceId,
      reactNativeBridge,
      map,
    )
    this.#sources.delete(message.payload.sourceId)
  }

  #addSourceAndItsLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    if (!map.getSource(props.id)) {
      map.addSource(props.id, props.source)
    }

    this.#addLayers(props, reactNativeBridge, map)
  }

  #updateSourceAndItsLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const oldSource = this.#sources.get(props.id)?.source
    const newSource = props.source

    const remountEverything = () => {
      this.#removeSourceAndItsLayers(props.id, reactNativeBridge, map)
      this.#addSourceAndItsLayers(props, reactNativeBridge, map)
    }

    if (
      newSource.type &&
      ['geojson', 'image', 'video', 'vector', 'raster'].includes(
        newSource.type,
      ) &&
      oldSource.type !== newSource.type
    ) {
      remountEverything()
      return
    }

    switch (newSource.type) {
      case 'geojson': {
        const prevNoData = { ...oldSource }
        const nextNoData = { ...newSource }
        delete prevNoData.data
        delete nextNoData.data

        // Update everything if a thing other than "data" changed.
        if (stableStringify(prevNoData) !== stableStringify(nextNoData)) {
          remountEverything()
          return
        }
        // Update only the data.
        if (
          stableStringify(oldSource.data) !== stableStringify(newSource.data)
        ) {
          const source = map.getSource(props.id) as maplibregl.GeoJSONSource
          source.setData(newSource.data)
        }
        break
      }
      case 'image': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'video': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'vector': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'raster': {
        // TODO optimization.
        remountEverything()
        return
      }
      default: {
        this.#removeSourceAndItsLayers(props.id, reactNativeBridge, map)
        return
      }
    }
    // Update the layers only if at least one changed (if one changed, the
    // orders of the layers might have changed, so we need to update all of
    // them).
    const oldLayersAsString = stableStringify(
      this.#sources.get(props.id)?.layers.map((item) => item.layer),
    )
    const newLayersAsString = stableStringify(
      props.layers.map((item) => item.layer),
    )
    if (oldLayersAsString !== newLayersAsString) {
      this.#updateLayers(props, reactNativeBridge, map)
      return
    }
  }

  #removeSourceAndItsLayers = (
    sourceId: MapSourceId,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#removeLayers(sourceId, reactNativeBridge, map)

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId)
    }
  }

  #addLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    props.layers.forEach(({ layer, beforeId }: MapSourceLayer) => {
      // Add the layer to the map.
      if (!map.getLayer(layer.id)) {
        map.addLayer(
          {
            source: props.id,
            ...layer,
          } as maplibregl.AddLayerObject,
          beforeId,
        )
        // Send the "mount" event to the React Native listener.
        reactNativeBridge.postMessage({
          type: 'mapSourceListenerEvent',
          payload: {
            sourceId: props.id,
            layerId: layer.id,
            eventName: 'mount',
          },
        })
      }
    })
  }

  #updateLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#removeLayers(props.id, reactNativeBridge, map)
    this.#addLayers(props, reactNativeBridge, map)
  }

  #removeLayers = (
    sourceId: MapSourceId,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const layers = map
      .getStyle()
      ?.layers?.filter(
        (layer): layer is LayerSpecification & { source: string } =>
          'source' in layer && layer.source === sourceId,
      )
      .map((layer) => layer.id)
    layers.forEach((layerId) => {
      // Remove the layer from the map.
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId)
      }
      // Send the "unmount" event to the React Native listener.
      reactNativeBridge.postMessage({
        type: 'mapSourceListenerEvent',
        payload: {
          sourceId,
          layerId,
          eventName: 'unmount',
        },
      })
    })
  }

  #setSourceListeners = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    props.layers?.forEach(({ layer, listeners }: MapSourceLayer) => {
      Object.entries(listeners ?? {}).forEach(([eventName]) => {
        // Skip RN listeners.
        if (eventName === 'mount' || eventName === 'unmount') {
          return
        }

        const sendEventToReactNative = (event: any) => {
          // Remove circular references that cannot be serialized.
          delete event.target
          // Send the event to the React Native listener.
          reactNativeBridge.postMessage({
            type: 'mapSourceListenerEvent',
            payload: {
              sourceId: props.id,
              layerId: layer.id,
              eventName: eventName as keyof MapSourceLayerListeners,
              event,
            },
          })
        }

        map.on(
          eventName as keyof maplibregl.MapLayerEventType,
          layer.id,
          sendEventToReactNative,
        )
      })
    })
  }
}
