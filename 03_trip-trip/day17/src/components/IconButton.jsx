import '../styles/CustomButton.css'

export const IconButton = ({ children, content }) => {
  return (
    <button type="button" className="icon-button">
      {children}
      <p>{content}</p>
    </button>
  )
}
