export const setIsWebWorldReadyMock = jest.fn()
export const getWebObjectListenersMock = jest.fn()
export const resolveWebObjectPendingMethodResponseMock = jest.fn()

const useMapAtomsMock = () => ({
  setIsWebWorldReady: setIsWebWorldReadyMock,
  getWebObjectListeners: getWebObjectListenersMock,
  resolveWebObjectPendingMethodResponse:
    resolveWebObjectPendingMethodResponseMock,
})

export default useMapAtomsMock
