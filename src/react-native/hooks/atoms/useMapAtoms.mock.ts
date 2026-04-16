let isWebWorldReady = false

export const setIsWebWorldReadyMock = jest.fn()
export const getWebObjectListenersMock = jest.fn()
export const setWebObjectListenersMock = jest.fn()
export const updateWebObjectListenersMock = jest.fn()
export const deleteWebObjectListenersMock = jest.fn()
export const getMapSourceListenersMock = jest.fn()
export const setMapSourceListenersMock = jest.fn()
export const deleteMapSourceListenersMock = jest.fn()
export const dispatchMessageMock = jest.fn()
export const resolveWebObjectPendingMethodResponseMock = jest.fn()
export const setWebObjectPendingMethodResponseMock = jest.fn()
export const setIsWebWorldReady = (value: boolean) => {
  isWebWorldReady = value
}

const useMapAtomsMock = () => ({
  isWebWorldReady,
  setIsWebWorldReady: setIsWebWorldReadyMock,
  getWebObjectListeners: getWebObjectListenersMock,
  setWebObjectListeners: setWebObjectListenersMock,
  updateWebObjectListeners: updateWebObjectListenersMock,
  deleteWebObjectListeners: deleteWebObjectListenersMock,
  getMapSourceListeners: getMapSourceListenersMock,
  setMapSourceListeners: setMapSourceListenersMock,
  deleteMapSourceListeners: deleteMapSourceListenersMock,
  dispatchMessage: dispatchMessageMock,
  resolveWebObjectPendingMethodResponse:
    resolveWebObjectPendingMethodResponseMock,
  setWebObjectPendingMethodResponse: setWebObjectPendingMethodResponseMock,
})

export default useMapAtomsMock
