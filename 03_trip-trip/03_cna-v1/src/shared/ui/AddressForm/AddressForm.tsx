'use client'
import { useToggle } from '@/shared/lib/hooks/useToggle'
import CustomButton from '../CustomButton/CustomButton'
import styles from './AddressForm.module.css'
import { PostAddr } from './types'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { ChangeEvent } from 'react'
import { Modal } from 'antd'

interface AddressFormProps {
  value: PostAddr | undefined
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCompleteAddress: (addr: { zipcode: string; addr1: string }) => void
}

// ERROR: 공사중...⚒️
export default function AddressForm({ value, onChange, onCompleteAddress }: AddressFormProps) {
  const { isOpen, handleToggle } = useToggle()

  const handleComplete = (data: any) => {
    onCompleteAddress({
      zipcode: data.zonecode,
      addr1: data.address,
    })

    handleToggle()
  }

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
        <CustomButton
          type={'button'}
          content={'우편번호 검색'}
          color={'default'}
          onClick={handleToggle}
        />
      </div>
      <input
        placeholder="주소를 입력해 주세요."
        name="addr.addr1"
        value={value?.addr1}
        onChange={onChange}
        readOnly
      />
      <input placeholder="상세주소" name="addr.addr2" value={value?.addr2} onChange={onChange} />

      {isOpen && (
        <Modal
          title="우편번호 검색"
          centered
          open={isOpen}
          onOk={handleToggle}
          onCancel={handleToggle}
          width={{
            xs: '90%',
            sm: '80%',
            md: '70%',
            lg: '60%',
            xl: '50%',
            xxl: '40%',
          }}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  )
}
