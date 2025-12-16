import type {
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnMapLayer,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
} from '@ml/react-native/components-factory/createWebObjectAsComponent.types'

export const isWebObjectListenerOnRN = (
  listener?:
    | WebObjectListenerOnRN<any>
    | WebObjectListenerOnObject<any>
    | WebObjectListenerOnHTMLElement<any>
    | WebObjectListenerOnMapLayer<any>,
): boolean => {
  if (!listener) {
    return false
  }
  return 'rnListener' in listener
}

export const isWebObjectListenerOnObject = (
  listener?:
    | WebObjectListenerOnRN<any>
    | WebObjectListenerOnObject<any>
    | WebObjectListenerOnHTMLElement<any>
    | WebObjectListenerOnMapLayer<any>,
): boolean => {
  if (!listener) {
    return false
  }
  return 'objectListener' in listener
}

export const isWebObjectListenerOnMapLayer = (
  listener?:
    | WebObjectListenerOnRN<any>
    | WebObjectListenerOnObject<any>
    | WebObjectListenerOnHTMLElement<any>
    | WebObjectListenerOnMapLayer<any>,
): boolean => {
  if (!listener) {
    return false
  }
  return 'layerListener' in listener
}

export const isWebObjectListenerOnHTMLElement = (
  listener?:
    | WebObjectListenerOnRN<any>
    | WebObjectListenerOnObject<any>
    | WebObjectListenerOnHTMLElement<any>
    | WebObjectListenerOnMapLayer<any>,
): boolean => {
  if (!listener) {
    return false
  }
  return 'elementListener' in listener
}
