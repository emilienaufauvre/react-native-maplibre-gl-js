import { render } from '@testing-library/react-native'
import Map from './Map'

describe('Map', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(<Map />)
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
