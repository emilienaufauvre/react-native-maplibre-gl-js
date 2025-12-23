import { render } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import useWebObjectMountOnLaunch from './hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'
import useWebObjectPropertiesUpdater from './hooks/useWebObjectPropertiesUpdater'
import { jest } from '@jest/globals'

jest.mock('./hooks/useWebObjectMethodsProxy', () =>
  require('./hooks/useWebObjectMethodsProxy.mock'),
)

jest.mock('./hooks/useWebObjectMountOnLaunch', () =>
  require('./hooks/useWebObjectMountOnLaunch.mock'),
)

jest.mock('./hooks/useWebObjectPropertiesUpdater', () =>
  require('./hooks/useWebObjectPropertiesUpdater.mock'),
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
      test('Then it has been mount on launch', () => {
        expect(useWebObjectMountOnLaunch).toHaveBeenCalledTimes(1)
      })

      test('Then it has set the methods proxy', () => {
        expect(useWebObjectMethodsProxy).toHaveBeenCalledTimes(1)
      })

      test('Then it has set the properties updater', () => {
        expect(useWebObjectPropertiesUpdater).toHaveBeenCalledTimes(1)
      })
    })
  })
})
