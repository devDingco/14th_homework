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
  
    if (name.startsWith("addr.")) {
      const key = name.split(".")[1] as keyof PostForm["addr"]

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
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: writer,
          password: password,
          title: title,
          contents: contents,
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

    alert('제출버튼이 눌렸습니다.')
    console.log('제출버튼이 눌렸습니다.')
    router.push('/boards/detail/1')
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
