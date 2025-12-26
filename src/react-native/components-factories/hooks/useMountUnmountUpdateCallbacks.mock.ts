export const mount = jest.fn()
export const update = jest.fn()
export const unmount = jest.fn()

const useMountUnmountUpdateCallbacksMock = (): {
  mount: () => void
  update: () => void
  unmount: () => void
} => ({
  // New reference each time the hook is called (as the original ones are RN
  // callbacks).
  mount: () => mount(),
  update: () => update(),
  unmount: () => unmount(),
})

export default useMountUnmountUpdateCallbacksMock
