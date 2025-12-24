import { render, act } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useWebObjectMountUnmountCallbacks from './useWebObjectMountUnmountCallbacks'
import {
  deleteWebObjectListenersMock,
  dispatchMessageMock,
  setWebObjectListenersMock,
} from '../../../hooks/atoms/useMapAtoms.mock'

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

describe('useWebObjectMountUnmountCallbacks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given a Probe using useWebObjectMountUnmountCallbacks is rendered', () => {
    const options = { foo: 'bar' }
    const listeners = { onTap: 'tapFunction' }
    const objectId = 'obj-1'
    const objectType = 'map'

    let mount: (args?: { options?: boolean; listeners?: boolean }) => void
    let unmount: (args?: { options?: boolean; listeners?: boolean }) => void

    beforeEach(() => {
      /**
       * Probe that uses useWebObjectMountUnmountCallbacks.
       */
      const Probe = () => {
        const callbacks = useWebObjectMountUnmountCallbacks(
          { options, listeners },
          objectId,
          objectType,
        )
        mount = callbacks.mount
        unmount = callbacks.unmount
        return null
      }

      render(<Probe />)
    })

    describe('When mount is called without parameters', () => {
      beforeEach(() => {
        act(() => mount())
      })

      test('Then the options and the listeners are mounted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectMount',
          payload: {
            objectId: 'obj-1',
            objectType: 'map',
            options: { foo: 'bar' },
            listeners: { onTap: 'tapFunction' },
          },
        })
        expect(setWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
          listeners: { onTap: 'tapFunction' },
        })
      })
    })

    describe('When mount is called twice without parameters', () => {
      beforeEach(() => {
        act(() => {
          mount()
          mount()
        })
      })

      test('Then mount is executed only once', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('When mount is called called with options only', () => {
      beforeEach(() => {
        act(() => mount({ options: true, listeners: false }))
      })

      test('Then only the options are mounted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectMount',
          payload: {
            objectId: 'obj-1',
            objectType: 'map',
            options: { foo: 'bar' },
            listeners: { onTap: 'tapFunction' },
          },
        })
        expect(setWebObjectListenersMock).not.toHaveBeenCalled()
      })
    })

    describe('When mount is called called with listeners only', () => {
      beforeEach(() => {
        act(() => mount({ options: false, listeners: true }))
      })

      test('Then only the listeners are mounted', () => {
        expect(dispatchMessageMock).not.toHaveBeenCalled()
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
          listeners: { onTap: 'tapFunction' },
        })
      })
    })

    describe('When after being mounted, unmount is called without parameters', () => {
      beforeEach(() => {
        act(() => {
          mount()
          unmount()
        })
      })

      test('Then the options and the listeners are unmounted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectUnmount',
          payload: { objectId: 'obj-1' },
        })
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
        })
      })
    })

    describe('When after being mounted, unmount is called twice without parameters', () => {
      beforeEach(() => {
        act(() => {
          mount()
          unmount()
          unmount()
        })
      })

      test('Then unmount is executed once', () => {
        const unmountCalls = dispatchMessageMock.mock.calls.filter(
          (item) => item[0]?.type === 'webObjectUnmount',
        )
        expect(unmountCalls).toHaveLength(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('When after being mounted, unmount is called with options only', () => {
      beforeEach(() => {
        act(() => {
          mount({ options: true, listeners: false })
          unmount({ options: true, listeners: false })
        })
      })

      test('Then only the options are unmounted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectUnmount',
          payload: { objectId: 'obj-1' },
        })
        expect(deleteWebObjectListenersMock).not.toHaveBeenCalled()
      })
    })

    describe('When after being mounted, unmount is called with listeners only', () => {
      beforeEach(() => {
        act(() => {
          mount({ options: false, listeners: true })
          unmount({ options: false, listeners: true })
        })
      })

      test('Then only the listeners are unmounted', () => {
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
        })
        expect(
          dispatchMessageMock.mock.calls.filter(
            (item) => item[0]?.type === 'webObjectUnmount',
          ),
        ).toHaveLength(0)
      })
    })
  })
})
