import { render } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import { jest } from '@jest/globals'
import useWebObjectMethodsProxy from '../hooks/useWebObjectMethodsProxy'
import useMountUpdateUnmountWhenNeeded from '../hooks/useMountUpdateUnmountWhenNeeded'

jest.mock('./../hooks/useWebObjectMethodsProxy', () =>
  require('./../hooks/useWebObjectMethodsProxy.mock'),
)

jest.mock('./../hooks/useMountUpdateUnmountWhenNeeded', () =>
  require('./../hooks/useMountUpdateUnmountWhenNeeded.mock'),
)

describe('createWebObjectAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the web object is rendered', () => {
    beforeEach(() => {
      const Component = createWebObjectAsComponent('map', [])
      render(<Component />)
    })

    describe('When nothing', () => {
      test('Then it has set the methods proxy', () => {
        expect(useWebObjectMethodsProxy).toHaveBeenCalledTimes(1)
      })

      test('Then it has set the mount/update/unmount hooks', () => {
        expect(useMountUpdateUnmountWhenNeeded).toHaveBeenCalledTimes(1)
      })
    })
  })
})
