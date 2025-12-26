import type { PropsWithoutRef } from 'react'
import type { MapSourceProps } from '../../components-factories/map-sources/createMapSourceAsComponent.types'
import type {
  WebObjectId,
  WebObjectProps,
  WebObjectType,
} from '../../components-factories/web-objects/createWebObjectAsComponent.types'

/**
 * The association between the type of the object that is being considered, and
 * its props' type.
 */
export type MountUpdateUnmountInput =
  | {
      type: 'webObject'
      props: PropsWithoutRef<WebObjectProps<any, any>>
      objectId: WebObjectId
      objectType: WebObjectType
    }
  | {
      type: 'mapSource'
      props: PropsWithoutRef<MapSourceProps<any>>
    }
