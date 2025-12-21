import { jest } from '@jest/globals'

const RNLoggerMock = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
}

export default RNLoggerMock
