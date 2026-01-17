import type { WebObjectId } from './createWebObjectAsComponent.types'

/**
 * UID generator for WebObjects.
 */
let __nextId = 1
export const genId = () => `wo_${__nextId++}` as WebObjectId
