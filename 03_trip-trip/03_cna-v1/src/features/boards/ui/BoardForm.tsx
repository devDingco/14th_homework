'use client'
import useForm from '@/features/boards/hooks/useBoardForm'
import { initialPostValue, PostForm } from '@/features/boards/model/types'
import validate from '@/features/boards/model/validation'
import CustomButton from '@/shared/ui/CustomButton/CustomButton'
import UploadImagesWithLabel from '@/shared/ui/UploadImage/UploadImagesWithLabel'
import styles from './BoardForm.module.css'
import AddressForm from '@/shared/ui/AddressForm/AddressForm'

interface BoardFormProps {
  isEdit: boolean
  data?: any //나중에 타입 바꾸기
  onSubmit: (values: PostForm) => void //부모로 부터 받는 제출 or 수정 함수
}

const mapDataToFormValues = (data: any): PostForm => {
  const board = data.fetchBoard
  return {
    writer: board.writer || '',
    password: '',
    title: board.title || '',
    contents: board.contents || '',
    addr: {
      zipcode: board.boardAddress?.zipcode || '',
      addr1: board.boardAddress?.address || '',
      addr2: board.boardAddress?.addressDetail || '',
    },
    link: board.youtubeUrl || '',
    img_src: board.images || [''],
  }
}

// ERROR: AddressForm 관련 대공사 예정....⚒️
export default function BoardForm(props: BoardFormProps) {
  const { isEdit, data, onSubmit } = props

  const formInitialValues = isEdit && data ? mapDataToFormValues(data) : initialPostValue
  const {
    values: post,
    errors,
    isActive,
    handleChange,
    handleSubmit,
  } = useForm({ initialValues: formInitialValues, validate, onSubmit, isEdit })

  return (
    <form className={styles['post-form']} onSubmit={handleSubmit}>
      <div className={styles['post-form-col']}>
        {/* 작성자 */}
        <div className={styles['post-form-input']}>
          <div>
            <label>작성자</label>
            <span>*</span>
          </div>

          <input
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            name="writer"
            onChange={handleChange}
            value={post.writer}
            disabled={isEdit}
          />
          <span className={styles['error-message']}>{errors.writer && errors.writer}</span>
        </div>

        {/* 비밀번호 */}
        <div className={styles['post-form-input']}>
          <div>
            <label>비밀번호</label>
            <span>*</span>
          </div>

          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            name="password"
            onChange={handleChange}
            value={post.password}
            disabled={isEdit}
          />
          <span className={styles['error-message']}>{errors.password && errors.password}</span>
        </div>
      </div>
      <hr />
      {/* 제목 */}
      <div className={styles['post-form-input']}>
        <div>
          <label>제목</label>
          <span>*</span>
        </div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          name="title"
          onChange={handleChange}
          value={post.title}
        />
        <span className={styles['error-message']}>{errors.title && errors.title}</span>
      </div>

      <hr />
      {/* 내용 */}
      <div className={styles['post-form-input']}>
        <div>
          <label>내용</label>
          <span>*</span>
        </div>

        <textarea
          placeholder="내용을 입력해 주세요."
          name="contents"
          onChange={handleChange}
          value={post.contents}
        />
        <span className={styles['error-message']}>{errors.contents && errors.contents}</span>
      </div>

      {/* 주소 */}
      <AddressForm onChange={handleChange} value={post.addr} />
      <hr />
      {/* 유튜브 링크 */}
      <div className={styles['post-form-input']}>
        <div>
          <label>유튜브 링크</label>
        </div>

        <input
          type="text"
          placeholder="링크를 입력해 주세요."
          name="link"
          onChange={handleChange}
          value={post.link}
        />
        {/* <span className="error-message">{errors.link && errors.link}</span> */}
      </div>
      <hr />

      <UploadImagesWithLabel />
      <div className={styles['post-actions']}>
        <CustomButton type={'button'} content={'취소'} color={'default'} />
        <CustomButton
          type={'submit'}
          content={isEdit ? '수정하기' : '등록하기'}
          color={'blue'}
          disabled={!isActive}
        />
      </div>
    </form>
  )
}
