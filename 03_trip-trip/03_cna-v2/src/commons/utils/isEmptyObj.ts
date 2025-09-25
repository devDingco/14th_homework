export const isEmptyObj = (obj) => {
  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).length === 0
  }

  return false
}
