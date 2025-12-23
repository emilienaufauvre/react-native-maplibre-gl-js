import { render, fireEvent, screen } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useWebObjectMountUnmountCallbacks from './useWebObjectMountUnmountCallbacks'
import type { WebObjectProps } from '../createWebObjectAsComponent.types'
import type { PropsWithChildren } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  deleteWebObjectListenersMock,
  dispatchMessageMock,
  setWebObjectListenersMock,
} from '../../hooks/atoms/useMapAtoms.mock'

const Harness = ({
  options,
  listeners,
  objectId = 'obj-1',
  objectType = 'map',
}: PropsWithChildren<
  WebObjectProps<any, any> & { objectId?: string; objectType?: any }
>) => {
  const { mount, unmount } = useWebObjectMountUnmountCallbacks(
    { options, listeners },
    objectId,
    objectType,
  )

  return (
    <>
      <TouchableOpacity
        testID="mount-default"
        onPress={() => mount()}
      />
      <TouchableOpacity
        testID="mount-options-only"
        onPress={() => mount({ options: true, listeners: false })}
      />
      <TouchableOpacity
        testID="mount-listeners-only"
        onPress={() => mount({ options: false, listeners: true })}
      />
      <TouchableOpacity
        testID="unmount-default"
        onPress={() => unmount()}
      />
      <TouchableOpacity
        testID="unmount-options-only"
        onPress={() => unmount({ options: true, listeners: false })}
      />
      <TouchableOpacity
        testID="unmount-listeners-only"
        onPress={() => unmount({ options: false, listeners: true })}
      />
    </>
  )
}

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

describe('useWebObjectMountUnmountCallbacks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the web object that uses the hook is rendered', () => {
    beforeEach(() => {
      render(
        <Harness
          options={{ foo: 'bar' }}
          listeners={{ onTap: 'tapFunction' }}
        />,
      )
    })

    describe('When mount-default is pressed', () => {
      beforeEach(() => {
        const button = screen.getByTestId('mount-default')
        fireEvent(button, 'click')
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

    describe('When mount-default is pressed twice', () => {
      beforeEach(() => {
        const button = screen.getByTestId('mount-default')
        fireEvent(button, 'click')
        fireEvent(button, 'click')
      })

      test('Then mount is executed only once', () => {
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('When mount-options-only is pressed', () => {
      beforeEach(() => {
        const button = screen.getByTestId('mount-options-only')
        fireEvent(button, 'click')
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

    describe('When mount-listeners-only is pressed', () => {
      beforeEach(() => {
        const button = screen.getByTestId('mount-listeners-only')
        fireEvent(button, 'click')
      })

      test('Then only the options are mounted', () => {
        expect(dispatchMessageMock).not.toHaveBeenCalled()
        expect(setWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(setWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
          listeners: { onTap: 'tapFunction' },
        })
      })
    })

    describe('When after being mounted, unmount-default is pressed', () => {
      beforeEach(() => {
        const mountButton = screen.getByTestId('mount-default')
        const unmountButton = screen.getByTestId('unmount-default')
        fireEvent(mountButton, 'click')
        fireEvent(unmountButton, 'click')
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

    describe('When after being mounted, unmount-default is pressed twice', () => {
      beforeEach(() => {
        const mountButton = screen.getByTestId('mount-default')
        const unmountButton = screen.getByTestId('unmount-default')
        fireEvent(mountButton, 'click')
        fireEvent(unmountButton, 'click')
        fireEvent(unmountButton, 'click')
      })

      test('Then unmount is executed once', () => {
        const unmountCalls = dispatchMessageMock.mock.calls.filter(
          (c) => c[0]?.type === 'webObjectUnmount',
        )
        expect(unmountCalls).toHaveLength(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('When after being mounted, unmount-options-only is pressed', () => {
      beforeEach(() => {
        const mountButton = screen.getByTestId('mount-options-only')
        const unmountButton = screen.getByTestId('unmount-options-only')
        fireEvent(mountButton, 'click')
        fireEvent(unmountButton, 'click')
      })

      test('Then only the options are unmounted', () => {
        expect(dispatchMessageMock).toHaveBeenCalledWith({
          type: 'webObjectUnmount',
          payload: { objectId: 'obj-1' },
        })
        expect(deleteWebObjectListenersMock).not.toHaveBeenCalled()
      })
    })

    describe('When after being mounted, unmount-listeners-only is pressed', () => {
      beforeEach(() => {
        const mountButton = screen.getByTestId('mount-listeners-only')
        const unmountButton = screen.getByTestId('unmount-listeners-only')
        fireEvent(mountButton, 'click')
        fireEvent(unmountButton, 'click')
      })

      test('Then only the listeners are unmounted', () => {
        expect(deleteWebObjectListenersMock).toHaveBeenCalledTimes(1)
        expect(deleteWebObjectListenersMock).toHaveBeenCalledWith({
          objectId: 'obj-1',
        })
        expect(
          dispatchMessageMock.mock.calls.filter(
            (c) => c[0]?.type === 'webObjectUnmount',
          ),
        ).toHaveLength(0)
      })
    })
  })
})
