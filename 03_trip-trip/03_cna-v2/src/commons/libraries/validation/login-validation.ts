export const loginValidation = (value) => {
  if (value.email.trim() === '') return false
  if (!value.email.includes('@')) return false
  if (value.password.trim() === '') return false

  return true
}
