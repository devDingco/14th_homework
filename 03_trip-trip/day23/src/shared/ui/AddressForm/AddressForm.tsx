'use client'
import CustomButton from '../CustomButton/CustomButton'
import styles from './AddressForm.module.css'
import { PostAddr } from './types'

interface AddressFormProps {
  value: PostAddr | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AddressForm({ value, onChange }: AddressFormProps) {
  return (
    <div className={styles['post-form-addr']}>
      <div>
        <label>주소</label>
      </div>
      <div className={styles['post-form-addr-active']}>
        <input
          className={styles['post-form-addr-zipcode']}
          placeholder="01234"
          name="addr.zipcode"
          value={value?.zipcode}
          onChange={onChange}
          readOnly
        />
        <CustomButton type={'button'} content={'우편번호 검색'} color={'default'} />
      </div>
      <input
        placeholder="주소를 입력해 주세요."
        name="addr.addr1"
        value={value?.addr1}
        onChange={onChange}
        readOnly
      />
      <input placeholder="상세주소" name="addr.addr2" value={value?.addr2} onChange={onChange} />
    </div>
  )
}
