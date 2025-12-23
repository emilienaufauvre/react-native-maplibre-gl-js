let isWebWorldReady = false

export const setIsWebWorldReadyMock = jest.fn()
export const getWebObjectListenersMock = jest.fn()
export const setWebObjectListenersMock = jest.fn()
export const deleteWebObjectListenersMock = jest.fn()
export const dispatchMessageMock = jest.fn()
export const resolveWebObjectPendingMethodResponseMock = jest.fn()
export const setIsWebWorldReady = (value: boolean) => {
  isWebWorldReady = value
}

const useMapAtomsMock = () => ({
  isWebWorldReady,
  setIsWebWorldReady: setIsWebWorldReadyMock,
  setWebObjectListeners: setWebObjectListenersMock,
  deleteWebObjectListeners: deleteWebObjectListenersMock,
  dispatchMessage: dispatchMessageMock,
  getWebObjectListeners: getWebObjectListenersMock,
  resolveWebObjectPendingMethodResponse:
    resolveWebObjectPendingMethodResponseMock,
})

export default useMapAtomsMock
