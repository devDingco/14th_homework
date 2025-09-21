'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './styles.module.css'
import { supabase } from 'commons/libraries/supabase'
import { useMutation } from '@apollo/client'
import {
  UploadFileDocument,
  UploadFileMutation,
  UploadFileMutationVariables,
} from 'commons/graphql/graphql'

export default function AdminBadgeForm() {
  const router = useRouter()
  const [badgeInput, setBadgeInput] = useState({
    name: '',
    description: '',
    imageFile: '',
  })
  const fileRef = useRef<HTMLInputElement>(null)

  const [uploadFile] = useMutation<UploadFileMutation, UploadFileMutationVariables>(
    UploadFileDocument
  )
  const [errors, setErrors] = useState({ name: '', description: '', imageFile: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBadgeInput((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const onClickImage = () => {
    fileRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await uploadFile({ variables: { file } })
    const fileUrl = result.data?.uploadFile.url

    if (fileUrl) {
      setBadgeInput((prev) => ({
        ...prev,
        imageFile: fileUrl,
      }))
      setErrors((prev) => ({ ...prev, imageFile: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = { name: '', description: '', imageFile: '' }
    if (!badgeInput.name) newErrors.name = '배지 이름을 입력해주세요.'
    if (!badgeInput.description) newErrors.description = '내용을 입력해주세요.'
    if (!badgeInput.imageFile) newErrors.imageFile = '이미지를 선택해주세요.'

    if (newErrors.name || newErrors.description || newErrors.imageFile) {
      setErrors(newErrors)
      return
    }

    try {
      const result = await supabase.from('badges').insert({
        name: badgeInput.name,
        description: badgeInput.description,
        image_url: badgeInput.imageFile,
      })
      alert('배지가 성공적으로 등록되었습니다.')
      console.log(result)
      router.push('/admin/badges')
    } catch (error) {
      console.error('배지 등록 실패:', error)
      alert('배지 등록에 실패했습니다.')
    }
  }

  return (
    <div className={styles.form_container}>
      <div className={styles.enroll_title}>배지 등록</div>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div className={styles['form_group']}>
          <label className={styles.label}>
            배지 이름<span>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="배지 이름을 입력해 주세요."
            name="name"
            onChange={handleChange}
            value={badgeInput.name}
          />
          {errors.name && <span className={styles.error_message}>{errors.name}</span>}
        </div>

        <div className={styles['form_group']}>
          <label className={styles.label}>
            내용<span>*</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="배지 획득 조건 등 내용을 입력해 주세요."
            name="description"
            onChange={handleChange}
            value={badgeInput.description}
          />
          {errors.description && <span className={styles.error_message}>{errors.description}</span>}
        </div>

        <div className={styles['form_group']}>
          <label className={styles.label}>
            배지 이미지<span>*</span>
          </label>
          <div className={styles['image_upload_wrapper']}>
            {badgeInput.imageFile === '' ? (
              <label htmlFor="file" className={styles['post-form-upload-img']}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M18.75 21.25H10.4167C10.0625 21.25 9.76568 21.1301 9.52624 20.8904C9.28652 20.6507 9.16666 20.3537 9.16666 19.9995C9.16666 19.6451 9.28652 19.3483 9.52624 19.1091C9.76568 18.8697 10.0625 18.75 10.4167 18.75H18.75V10.4166C18.75 10.0625 18.8699 9.76565 19.1096 9.52621C19.3493 9.28649 19.6462 9.16663 20.0004 9.16663C20.3549 9.16663 20.6517 9.28649 20.8908 9.52621C21.1303 9.76565 21.25 10.0625 21.25 10.4166V18.75H29.5833C29.9375 18.75 30.2343 18.8698 30.4737 19.1095C30.7135 19.3493 30.8333 19.6462 30.8333 20.0004C30.8333 20.3548 30.7135 20.6516 30.4737 20.8908C30.2343 21.1302 29.9375 21.25 29.5833 21.25H21.25V29.5833C21.25 29.9375 21.1301 30.2343 20.8904 30.4737C20.6507 30.7134 20.3537 30.8333 19.9996 30.8333C19.6451 30.8333 19.3483 30.7134 19.1092 30.4737C18.8697 30.2343 18.75 29.9375 18.75 29.5833V21.25Z"
                    fill="#777777"
                  />
                </svg>
                <div>클릭해서 사진 업로드</div>
              </label>
            ) : (
              <div onClick={onClickImage}>
                <Image
                  src={`https://storage.googleapis.com/${badgeInput.imageFile}`}
                  alt="업로드된 이미지"
                  fill
                  style={{ maxWidth: '400px' }}
                />
              </div>
            )}
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              ref={fileRef}
              accept="image/*"
            />
          </div>
          {errors.imageFile && <span className={styles.error_message}>{errors.imageFile}</span>}
        </div>

        <button type="submit" className={styles['post-active-button']}>
          {'배지 등록하기'}
        </button>
      </form>
    </div>
  )
}
