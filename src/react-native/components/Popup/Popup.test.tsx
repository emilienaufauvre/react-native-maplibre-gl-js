import { render } from '@testing-library/react-native'
import Popup from './Popup'

describe('Popup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(<Popup />)
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
