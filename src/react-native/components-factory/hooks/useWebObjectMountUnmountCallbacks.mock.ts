import type { MountUnmountCallbacksOptions } from './useWebObjectMountUnmountCallbacks.types'

export const mount = jest.fn()
export const unmount = jest.fn()

const useWebObjectMountUnmountCallbacksMock = (): {
  mount: (options?: MountUnmountCallbacksOptions) => void
  unmount: (options?: MountUnmountCallbacksOptions) => void
} => ({
  mount,
  unmount,
})

export default useWebObjectMountUnmountCallbacksMock
