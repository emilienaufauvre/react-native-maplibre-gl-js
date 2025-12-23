import { render, screen } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import { jest } from '@jest/globals'
import type {
  WebObjectComponent,
  WebObjectRef,
  WebObjectProps,
} from './createWebObjectAsComponent.types'
import { mount, unmount } from './hooks/useWebObjectMountUnmountCallbacks.mock'

jest.mock('./hooks/useWebObjectMountUnmountCallbacks', () =>
  require('./hooks/useWebObjectMountUnmountCallbacks.mock'),
)

describe('createWebObjectAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the web object is rendered', () => {
    let Component: WebObjectComponent<
      WebObjectRef<any>,
      WebObjectProps<any, any>
    >

    beforeEach(() => {
      Component = createWebObjectAsComponent('map')
      render(<Component />)
    })

    describe('When nothing', () => {
      test('Then everything have been mounted', () => {
        expect(mount).toHaveBeenCalledTimes(2)
        expect(mount).toHaveBeenNthCalledWith(1)
      })

      test('Then a re-mount has also been triggered', () => {
        expect(mount).toHaveBeenCalledTimes(2)
        expect(mount).toHaveBeenNthCalledWith(2, {
          options: false,
          listeners: true,
        })
        // Note: re-mount should have no effect (see "mount" implementation).
      })
    })

    describe('When rerendered with new listeners', () => {
      beforeEach(() => {
        screen.rerender(<Component listeners={{ new: () => {} }} />)
      })

      test('Then only the listeners have been re-mounted', () => {
        expect(unmount).toHaveBeenCalledWith({
          options: false,
          listeners: true,
        })
        expect(mount).toHaveBeenCalledWith({
          options: false,
          listeners: true,
        })
      })
    })

    describe('When rerendered with no change', () => {
      beforeEach(() => {
        screen.rerender(<Component />)
      })

      test('Then only the listeners have been re-mounted', () => {
        expect(unmount).toHaveBeenCalledWith({
          options: false,
          listeners: true,
        })
        expect(mount).toHaveBeenCalledWith({
          options: false,
          listeners: true,
        })
      })
    })

    describe('When rerendered with new options', () => {
      beforeEach(() => {
        screen.rerender(<Component options={{ new: true }} />)
      })

      test('Then everything have been re-mounted', () => {
        expect(unmount).toHaveBeenCalledWith({
          options: true,
          listeners: true,
        })
        expect(mount).toHaveBeenCalledWith({
          options: true,
          listeners: true,
        })
      })
    })
  })
})
