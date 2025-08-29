import { CustomButtonColor } from 'components/CustomButton.types'
import { ValidateErrors } from 'routes/boards/board.shared'

export function isEmptyObj(obj: ValidateErrors): boolean {
  for (let key in obj) {
    const typedKey = key as keyof ValidateErrors
    if (obj[typedKey]) return false
  }
  return true
}

export const getButtonStyleByColor = (color: CustomButtonColor) => {
  switch (color) {
    case 'default':
      return
    case 'blue':
      return {
        backgroundColor: '#2974E5',
        color: 'var(--color-white)',
        border: 'none',
      }
    case 'black':
      return {
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-black)',
        border: 'none',
      }
  }
}
