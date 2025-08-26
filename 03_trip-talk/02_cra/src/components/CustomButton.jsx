export const CustomButton = (props) => {
  const { type = 'button', content, disabled = false, color } = props

  const getButtonStyleByColor = (color) => {
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
  return (
    <button type={type} style={getButtonStyleByColor(color)} disabled={disabled}>
      {content}
    </button>
  )
}
