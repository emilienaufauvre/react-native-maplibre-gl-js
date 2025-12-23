let isWebWorldReady = false

export const setIsWebWorldReadyMock = jest.fn()
export const getWebObjectListenersMock = jest.fn()
export const resolveWebObjectPendingMethodResponseMock = jest.fn()
export const setIsWebWorldReady = (value: boolean) => {
  isWebWorldReady = value
}

const useMapAtomsMock = () => ({
  isWebWorldReady,
  setIsWebWorldReady: setIsWebWorldReadyMock,
  getWebObjectListeners: getWebObjectListenersMock,
  resolveWebObjectPendingMethodResponse:
    resolveWebObjectPendingMethodResponseMock,
})

export default useMapAtomsMock
