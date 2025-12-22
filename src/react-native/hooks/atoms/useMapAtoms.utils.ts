/**
 * Stable stringify for messages that may contain functions. Keep the function
 * members as '...' to allow identification of the object type (by default, a
 * function cannot be stringified and is removed from the final string).
 * Keys are sorted alphabetically to ensure consistent output.
 * @param message - The message to be stringified.
 * @returns - The stringified message.
 */
export const stableStringify = (message: any): string => {
  const replacer = (_: string, value: any) => {
    if (typeof value === 'function') {
      return '...'
    }
    return value
  }

  const sortKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortKeys)
    } else if (obj !== null && typeof obj === 'object') {
      const sortedObj: Record<string, any> = {}
      Object.keys(obj)
        .sort()
        .forEach((key) => {
          sortedObj[key] = sortKeys(obj[key])
        })
      return sortedObj
    }
    return obj
  }

  return JSON.stringify(sortKeys(message), replacer)
}
