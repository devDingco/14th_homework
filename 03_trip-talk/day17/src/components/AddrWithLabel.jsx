import { CustomButton } from './CustomButton'
export const AddrWithLabel = (props) => {
  const { label, required = false, placeholder, onChange, name, value } = props
  // const name = convertToInputName(label)

  return (
    <div className="post-form-addr">
      <div>
        <label>{label}</label>
        <span>{required ? '*' : ''}</span>
      </div>
      <div className="post-form-addr-active">
        <input
          className="post-form-addr-zipcode"
          placeholder={placeholder.zipcode}
          // name={name.zipcode}
          // onChange={handleChange}
        />
        <CustomButton type={'button'} content={'우편번호 검색'} color={'default'} />
      </div>
      <input placeholder={placeholder.addr1} />
      <input placeholder={placeholder.addr2} />
    </div>
  )
}
