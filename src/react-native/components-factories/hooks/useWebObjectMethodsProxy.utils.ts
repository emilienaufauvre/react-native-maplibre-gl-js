import type { WebObjectMethodCallRequestId } from '../web-objects/createWebObjectAsComponent.types'

export const genRequestId = (): WebObjectMethodCallRequestId => {
  return Math.random().toString(36).slice(2, 11)
}
