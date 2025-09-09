import { ValidateErrors } from './types'

export function isEmptyObj(obj: ValidateErrors): boolean {
  for (let key in obj) {
    const typedKey = key as keyof ValidateErrors
    if (obj[typedKey]) return false
  }
  return true
}
