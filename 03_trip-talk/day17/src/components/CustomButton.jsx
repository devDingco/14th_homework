import { getButtonStyleByColor } from '../utils/objectUtils'

export const CustomButton = (props) => {
  const { type = 'button', content, disabled = false, color } = props
  const myBtnColor = getButtonStyleByColor(color)
  return (
    <button type={type} style={myBtnColor} disabled={disabled}>
      <img />
      {content}
    </button>
  )
}
