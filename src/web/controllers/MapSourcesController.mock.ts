import type ReactNativeBridge from '../bridge/ReactNativeBridge'

/**
 * A minimal stand-in for a `MapLibre GL JS` map, faithful on the two behaviors
 * this controller has to work around:
 * - `addLayer` drops the layer entirely when `beforeId` does not exist;
 * - `moveLayer` removes the layer from the order before checking `beforeId`,
 *   so a missing anchor loses the layer.
 * @returns - The fake map, plus the helpers to drive its lifecycle.
 */
export const createFakeMap = () => {
  const layersOrder: string[] = []
  const layerSources = new Map<string, string>()
  const sources = new Map<string, any>()
  const onceListeners = new Map<string, (() => void)[]>()
  const errors: string[] = []

  let isStyleLoaded = false

  const map = {
    isStyleLoaded: () => isStyleLoaded,
    once: (eventName: string, listener: () => void) => {
      onceListeners.set(eventName, [
        ...(onceListeners.get(eventName) ?? []),
        listener,
      ])
      return map
    },
    on: () => map,
    getSource: (sourceId: string) => sources.get(sourceId),
    addSource: (sourceId: string, source: any) => {
      sources.set(sourceId, { ...source, setData: jest.fn() })
    },
    removeSource: (sourceId: string) => {
      sources.delete(sourceId)
    },
    getLayer: (layerId: string) =>
      layersOrder.includes(layerId)
        ? { id: layerId, source: layerSources.get(layerId) }
        : undefined,
    getLayersOrder: () => [...layersOrder],
    addLayer: (layer: any, beforeId?: string) => {
      const index = beforeId
        ? layersOrder.indexOf(beforeId)
        : layersOrder.length

      if (beforeId && index === -1) {
        errors.push(
          `Cannot add layer "${layer.id}" before non-existing layer "${beforeId}".`,
        )
        return
      }

      layersOrder.splice(index, 0, layer.id)
      layerSources.set(layer.id, layer.source)
    },
    moveLayer: (layerId: string, beforeId?: string) => {
      layersOrder.splice(layersOrder.indexOf(layerId), 1)
      const newIndex = beforeId
        ? layersOrder.indexOf(beforeId)
        : layersOrder.length

      if (beforeId && newIndex === -1) {
        errors.push(
          `Cannot move layer "${layerId}" before non-existing layer "${beforeId}".`,
        )
        return
      }

      layersOrder.splice(newIndex, 0, layerId)
    },
    removeLayer: (layerId: string) => {
      layersOrder.splice(layersOrder.indexOf(layerId), 1)
      layerSources.delete(layerId)
    },
  }

  return {
    map: map as any,
    errors,
    getLayersOrder: () => [...layersOrder],
    setIsStyleLoaded: (value: boolean) => {
      isStyleLoaded = value
    },
    emit: (eventName: string) => {
      const listeners = onceListeners.get(eventName) ?? []
      onceListeners.set(eventName, [])
      listeners.forEach((listener) => listener())
    },
  }
}

/**
 * @returns - A bridge that records the messages sent to React Native.
 */
export const createFakeReactNativeBridge = () =>
  ({ postMessage: jest.fn() }) as unknown as ReactNativeBridge

/**
 * @param options - The source description.
 * @param options.id - The source id.
 * @param options.layers - The layers, with their optional declared anchor.
 * @returns - A "mapSourceMount" message for a GeoJSON source.
 */
export const createMountMessage = ({
  id,
  layers,
}: {
  id: string
  layers: { id: string; beforeId?: string }[]
}) =>
  ({
    type: 'mapSourceMount',
    payload: {
      id,
      source: {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      },
      layers: layers.map(({ id: layerId, beforeId }) => ({
        layer: { id: layerId, type: 'fill' },
        beforeId,
      })),
    },
  }) as any
