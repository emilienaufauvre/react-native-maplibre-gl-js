import { render } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import useWebObjectMountOnLaunch from './hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'
import useWebObjectPropertiesUpdater from './hooks/useWebObjectPropertiesUpdater'

describe('createWebObjectAsComponent', () => {
  describe('Given a web object', () => {
    beforeEach(() => {
      const Component = createWebObjectAsComponent('map')
      render(<Component />)
    })

    describe('When nothing', () => {
      test('Then it has been mount on launch', () => {
        expect(useWebObjectMountOnLaunch).toHaveBeenCalled()
      })

      test('Then it has set the methods proxy', () => {
        expect(useWebObjectMethodsProxy).toHaveBeenCalled()
      })

      test('Then it has set the properties updater', () => {
        expect(useWebObjectPropertiesUpdater).toHaveBeenCalled()
      })
    })
  })
})
