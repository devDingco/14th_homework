import { getButtonStyleByColor } from './lib/styles'
import { CustomButtonProps } from './CustomButton.types'

export default function CustomButton(props: CustomButtonProps) {
  const { type = 'button', content, disabled = false, color } = props
  const myBtnColor = getButtonStyleByColor(color)
  return (
    <button type={type} style={myBtnColor} disabled={disabled}>
      {content}
    </button>
  )
}
