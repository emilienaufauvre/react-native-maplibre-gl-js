import { render } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'
import useWebObjectMountUnmountWithProps from './hooks/useWebObjectMountUnmountWithProps'
import { jest } from '@jest/globals'

jest.mock('./hooks/useWebObjectMethodsProxy', () =>
  require('./hooks/useWebObjectMethodsProxy.mock'),
)

jest.mock('./hooks/useWebObjectMountUnmountWithProps', () =>
  require('./hooks/useWebObjectMountUnmountWithProps.mock'),
)

describe('createWebObjectAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the web object is rendered', () => {
    beforeEach(() => {
      const Component = createWebObjectAsComponent('map')
      render(<Component />)
    })

    describe('When nothing', () => {
      test('Then it has set the methods proxy', () => {
        expect(useWebObjectMethodsProxy).toHaveBeenCalledTimes(1)
      })

      test('Then it has been mount on launch', () => {
        expect(useWebObjectMountUnmountWithProps).toHaveBeenCalledTimes(1)
      })
    })
  })
})
