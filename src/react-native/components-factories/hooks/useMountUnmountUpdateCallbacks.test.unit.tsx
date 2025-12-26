import { render, act } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useMountUnmountUpdateCallbacks from './useMountUnmountUpdateCallbacks'
import {
  deleteMapSourceListenersMock,
  deleteWebObjectListenersMock,
  dispatchMessageMock,
  setMapSourceListenersMock,
  setWebObjectListenersMock,
} from '../../hooks/atoms/useMapAtoms.mock'
import type { MapSourceLayer } from '../map-sources/createMapSourceAsComponent.types'

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

describe('useMountUnmountUpdateCallbacks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given a Probe using useMountUnmountUpdateCallbacks for web object type is rendered', () => {
    const options = { foo: 'bar' }
    const listeners = { onTap: 'tapFunction' }
    const objectId = 'obj-1'
    const objectType = 'map'

    let mount: (args?: any) => void
    let update: (args?: any) => void
    let unmount: (args?: any) => void

    beforeEach(() => {
      /**
       * Probe that uses useMountUnmountUpdateCallbacks for a web object.
       */
      const Probe = () => {
        const callbacks = useMountUnmountUpdateCallbacks({
          type: 'webObject',
          props: {
            options,
            listeners,
          },
          objectId,
          objectType,
        })
        mount = callbacks.mount
        update = callbacks.update
        unmount = callbacks.unmount
        return null
      }

      render(<Probe />)
    })

    describe('When mount is called', () => {
      beforeEach(() => {
        act(() => mount())
      })

      test('Then webObjectMount message is sent and listeners are set', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectMount',
          payload: {
            objectId,
            objectType,
            options,
            listeners,
          },
        })
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledWith({
          objectId,
          listeners,
        })
      })
    })

    describe('When update is called', () => {
      beforeEach(() => {
        act(() => update())
      })

      test('Then webObjectUpdate message is sent and listeners are set', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectUpdate',
          payload: {
            objectId,
            objectType,
            options,
            listeners,
          },
        })
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledWith({
          objectId,
          listeners,
        })
      })
    })

    describe('When unmount is called', () => {
      beforeEach(() => {
        act(() => unmount())
      })

      test('Then webObjectUnmount message is sent and listeners are deleted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectUnmount',
          payload: {
            objectId,
          },
        })
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledWith({
          objectId,
        })
      })
    })
  })

  describe('Given a Probe using useMountUnmountUpdateCallbacks for map source type is rendered', () => {
    const sourceId = 'src-1'
    const source = { foo: 'bar' }
    const layers = [
      {
        layer: { id: 'layer-1', type: 'fill' },
        listeners: { click: () => 'tapFunction' },
      },
    ] as MapSourceLayer[]

    let mount: (args?: any) => void
    let update: (args?: any) => void
    let unmount: (args?: any) => void

    beforeEach(() => {
      /**
       * Probe that uses useMountUnmountUpdateCallbacks for a map source.
       */
      const Probe = () => {
        const callbacks = useMountUnmountUpdateCallbacks({
          type: 'mapSource',
          props: {
            id: sourceId,
            source,
            layers,
          },
        })
        mount = callbacks.mount
        update = callbacks.update
        unmount = callbacks.unmount
        return null
      }

      render(<Probe />)
    })

    describe('When mount is called', () => {
      beforeEach(() => {
        act(() => mount())
      })

      test('Then mapSourceMount message is sent and listeners are set', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'mapSourceMount',
          payload: {
            id: sourceId,
            source,
            layers,
          },
        })
        expect(setMapSourceListenersMock).toHaveBeenCalledTimes(1)
        expect(setMapSourceListenersMock).toHaveBeenCalledWith({
          sourceId,
          listeners: layers.map(({ layer, listeners }) => ({
            layerId: layer.id,
            listeners,
          })),
        })
      })
    })

    describe('When update is called', () => {
      beforeEach(() => {
        act(() => update())
      })

      test('Then mapSourceUpdate message is sent and listeners are set', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'mapSourceUpdate',
          payload: {
            id: sourceId,
            source,
            layers,
          },
        })
        expect(setMapSourceListenersMock).toHaveBeenCalledTimes(1)
        expect(setMapSourceListenersMock).toHaveBeenCalledWith({
          sourceId,
          listeners: layers.map(({ layer, listeners }) => ({
            layerId: layer.id,
            listeners,
          })),
        })
      })
    })

    describe('When unmount is called', () => {
      beforeEach(() => {
        act(() => unmount())
      })

      test('Then mapSourceUnmount message is sent and listeners are deleted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'mapSourceUnmount',
          payload: {
            sourceId,
          },
        })
        expect(deleteMapSourceListenersMock).toHaveBeenCalledTimes(1)
        expect(deleteMapSourceListenersMock).toHaveBeenCalledWith({
          sourceId,
        })
      })
    })
  })
})
