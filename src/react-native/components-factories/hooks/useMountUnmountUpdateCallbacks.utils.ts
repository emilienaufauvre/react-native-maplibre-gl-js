import type { WebObjectListeners } from '../web-objects/createWebObjectAsComponent.types'
import type {
  HTMLElementDescriptor,
  HTMLElementDescriptorListener,
} from '../../../communication/messages.types'
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

export const extractHTMLElementListenersFromOptions = (
  options: any,
  optionsThatAreHTMLElements: readonly string[],
): WebObjectListeners => {
  let callbacks: WebObjectListeners = {}

  for (const key of optionsThatAreHTMLElements) {
    callbacks = {
      ...callbacks,
      ...extractHTMLElementListenersFromDescriptor(options?.[key]),
    }
  }

  return callbacks
}

export const extractHTMLElementListenersFromMethodArgs = (
  methodArgs: any[],
): WebObjectListeners => {
  let callbacks: WebObjectListeners = {}

  for (const arg of methodArgs) {
    // TODO we need a more robust way to identify HTMLElements. A class for
    //  HTMLElementDescriptor could be created.
    if (!arg?.listeners) {
      continue
    }
    callbacks = {
      ...callbacks,
      ...extractHTMLElementListenersFromDescriptor(arg),
    }
  }

  return callbacks
}

const extractHTMLElementListenersFromDescriptor = (
  htmlElement: HTMLElementDescriptor | undefined,
): WebObjectListeners => {
  const callbacks: WebObjectListeners = {}
  const htmlListeners = htmlElement?.listeners as
    | HTMLElementDescriptorListener[]
    | undefined

  htmlListeners?.forEach((listener) => {
    callbacks[getHTMLElementDescriptorListenerName(listener)] = {
      elementListener: listener.callback,
    }
  })

  return callbacks
}
