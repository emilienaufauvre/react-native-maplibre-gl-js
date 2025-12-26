import { render } from '@testing-library/react-native'
import createMapSourceAsComponent from './createMapSourceAsComponent'
import { jest } from '@jest/globals'
import useMountUpdateUnmountWhenNeeded from '../hooks/useMountUpdateUnmountWhenNeeded'

jest.mock('./../hooks/useWebObjectMethodsProxy', () =>
  require('./../hooks/useWebObjectMethodsProxy.mock'),
)

jest.mock('./../hooks/useMountUpdateUnmountWhenNeeded', () =>
  require('./../hooks/useMountUpdateUnmountWhenNeeded.mock'),
)

describe('createMapSourceAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the map source is rendered', () => {
    beforeEach(() => {
      const Component = createMapSourceAsComponent()
      render(
        <Component
          id={'src-1'}
          source={{}}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      test('Then it has set the mount/update/unmount hooks', () => {
        expect(useMountUpdateUnmountWhenNeeded).toHaveBeenCalledTimes(1)
      })
    })
  })
})
