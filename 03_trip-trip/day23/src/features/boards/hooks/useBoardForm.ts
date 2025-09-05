'use client'
import { ChangeEvent, useState } from 'react'
import { isEmptyObj } from '../model/utils'
import { PostForm, ValidateErrors, ValidateValues } from '../model/types'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from '../api/mutation'

export interface UseFormReturn {
  values: PostForm
  errors: ValidateErrors
  isActive: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface UseFormProps {
  initialValues: PostForm
  validate: (values: ValidateValues) => ValidateErrors
}

// ERROR: 공사중...⚒️
// CONSIDER: 추후 수정하기 로직에서 재사용 가능하게 생각해보기
const useForm = ({ initialValues, validate }: UseFormProps): UseFormReturn => {
  const [values, setValues] = useState<PostForm>(initialValues)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()

  const [createBoard] = useMutation(CREATE_BOARD)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    if (name.startsWith('addr.')) {
      const key = name.split('.')[1] as keyof PostForm['addr']

      const nextValue: PostForm = {
        ...values,
        addr: {
          ...values.addr,
          [key]: value,
        },
      }

      setValues(nextValue)

      const myErrors = validate(nextValue)
      setErrors(myErrors)
      setIsActive(isEmptyObj(myErrors))
    } else {
      const nextValue: PostForm = { ...values, [name]: value } as PostForm

      setValues(nextValue)

      const myErrors = validate(nextValue)
      setErrors(myErrors)
      setIsActive(isEmptyObj(myErrors))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { writer, password, title, contents, link, addr, img_src } = values
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            youtubeUrl: link,
            boardAddress: {
              zipcode: addr?.zipcode,
              address: addr?.addr1,
              addressDetail: addr?.addr2,
            },
            images: img_src,
          },
        },
      })
      console.log('🚀 ~ handleSubmit ~ values:', values)
      console.log('🚀 ~ handleSubmit ~ result:', result)

      const boardId = result.data.createBoard._id
      alert('제출버튼이 눌렸습니다.')
      console.log('제출버튼이 눌렸습니다.')
      router.push(`/boards/${boardId}`)
    } catch (error) {
      alert(error ?? '에러가 발생하였습니다. 다시 시도해 주세요.')
    }
  }

  return {
    values,
    errors,
    isActive,
    handleChange,
    handleSubmit,
  }
}

export default useForm
