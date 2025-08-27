export const InputWithLabel = (props) => {
  const {
    type = 'text',
    label,
    required = false,
    placeholder,
    onChange,
    name,
    value,
    error,
  } = props

  return (
    <div className="post-form-input">
      <div>
        <label>{label}</label>
        <span>{required && '*'}</span>
      </div>

      <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} />
      <span className="error-message">{error ? error : ''}</span>
    </div>
  )
}
