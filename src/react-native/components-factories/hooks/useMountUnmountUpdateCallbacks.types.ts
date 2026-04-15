import type { PropsWithoutRef } from 'react'
import type { MapSourceProps } from '../map-sources/createMapSourceAsComponent.types'
import type {
  WebObjectId,
  WebObjectProps,
  WebObjectType,
} from '../web-objects/createWebObjectAsComponent.types'

/**
 * The association between the type of the object that is being considered, and
 * its props' type.
 */
export type MountUpdateUnmountInput =
  | {
      type: 'webObject'
      props: PropsWithoutRef<WebObjectProps<any, any>>
      optionsThatAreHTMLElements: readonly string[]
      objectId: WebObjectId
      objectType: WebObjectType
    }
  | {
      type: 'mapSource'
      props: PropsWithoutRef<MapSourceProps<any>>
    }
