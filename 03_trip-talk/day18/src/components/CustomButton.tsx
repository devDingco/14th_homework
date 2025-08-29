import { getButtonStyleByColor } from '../utils/objectUtils'
import { CustomButtonProps } from './CustomButton.types'

export const CustomButton = (props: CustomButtonProps) => {
  const { type = 'button', content, disabled = false, color } = props
  const myBtnColor = getButtonStyleByColor(color)
  return (
    <button type={type} style={myBtnColor} disabled={disabled}>
      {content}
    </button>
  )
}
