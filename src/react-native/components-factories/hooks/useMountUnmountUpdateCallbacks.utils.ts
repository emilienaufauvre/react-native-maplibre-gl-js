import type {
  WebObjectListenerOnHTMLElement,
  WebObjectListeners,
} from '../web-objects/createWebObjectAsComponent.types'
import type { HTMLElementDescriptorListener } from '../../../communication/messages.types'
import { getHTMLElementDescriptorListenerName } from '../../../communication/messages.utils'

export const removeHTMLElementListeners = (
  options: any,
  optionsThatAreHTMLElements: readonly string[],
): any => {
  if (!options || typeof options !== 'object') {
    return options
  }
  if (Array.isArray(options)) {
    return options.map((opt) =>
      removeHTMLElementListeners(opt, optionsThatAreHTMLElements),
    )
  }

  const result: any = {}
  for (const key in options) {
    if (
      optionsThatAreHTMLElements.includes(key) &&
      Array.isArray(options[key]?.listeners)
    ) {
      result[key] = {
        ...options[key],
        listeners: options[key].listeners.map(
          ({ cssSelector, eventName }: HTMLElementDescriptorListener) => ({
            cssSelector,
            eventName,
          }),
        ),
      }
    } else {
      result[key] = removeHTMLElementListeners(
        options[key],
        optionsThatAreHTMLElements,
      )
    }
  }
  return result
}

export const extractHTMLElementListeners = (
  options: any,
  optionsThatAreHTMLElements: readonly string[],
): WebObjectListeners => {
  const callbacks: Record<string, WebObjectListenerOnHTMLElement<any>> = {}

  for (const key of optionsThatAreHTMLElements) {
    const htmlListeners = options?.[key]?.listeners as
      | HTMLElementDescriptorListener[]
      | undefined
    htmlListeners?.forEach((listener) => {
      callbacks[getHTMLElementDescriptorListenerName(listener)] = {
        elementListener: listener.callback,
      }
    })
  }

  return callbacks
}
