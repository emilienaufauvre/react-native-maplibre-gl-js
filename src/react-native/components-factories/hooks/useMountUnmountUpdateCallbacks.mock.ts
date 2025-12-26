export const mount = jest.fn()
export const update = jest.fn()
export const unmount = jest.fn()

const useMountUnmountUpdateCallbacksMock = (): {
  mount: () => void
  update: () => void
  unmount: () => void
} => ({
  mount,
  update,
  unmount,
})

export default useMountUnmountUpdateCallbacksMock
