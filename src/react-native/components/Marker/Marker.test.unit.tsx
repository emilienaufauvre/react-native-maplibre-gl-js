import { render } from '@testing-library/react-native'
import Marker from './Marker'

describe('Marker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(<Marker />)
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
