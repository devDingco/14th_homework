import { CustomButtonColor } from '../CustomButton.types'

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
        color: 'var(--color-white)',
        border: 'none',
      }
  }
}
