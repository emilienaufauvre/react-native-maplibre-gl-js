/**
 * Stable stringify for messages that may contain functions. Keep the function
 * members as '...' to allow identification of the object type (by default a
 * function cannot be stringified and is removed from the final string).
 * @param message - The message to be stringified.
 * @returns - The stringified message.
 */
export const stableStringify = (message: any): string => {
  return JSON.stringify(message, (_, value) => {
    if (typeof value === 'function') {
      return '...'
    }
    return value
  })
}
