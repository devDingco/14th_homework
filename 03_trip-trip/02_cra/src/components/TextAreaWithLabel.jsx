export const TextAreaWithLabel = (props) => {
  const { label, required = false, placeholder, onChange, name, value, error } = props
  // const name = convertToInputName(label)

  return (
    <div className="post-form-input">
      <div>
        <label>{label}</label>
        <span>{required && '*'}</span>
      </div>

      <textarea placeholder={placeholder} name={name} onChange={onChange} value={value} />
      <span className="error-message">{error ? error : ''}</span>
    </div>
  )
}
