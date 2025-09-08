'use client'
import { ChangeEvent, useState } from 'react'
import { isEmptyObj } from '../model/utils'
import { PostForm, ValidateErrors, ValidateValues } from '../model/types'
import { useParams, useRouter } from 'next/navigation'

export interface UseFormReturn {
  values: PostForm
  errors: ValidateErrors
  isActive: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface UseFormProps {
  initialValues: PostForm
  validate: (values: ValidateValues, isEdit: boolean) => ValidateErrors
  onSubmit: (values: PostForm) => void
  isEdit: boolean
}

// ERROR: 공사중...⚒️
const useForm = ({ initialValues, validate, onSubmit, isEdit }: UseFormProps): UseFormReturn => {
  const [values, setValues] = useState<PostForm>(initialValues)
  const [errors, setErrors] = useState(() => {
    return validate(initialValues, isEdit)
  })
  const [isActive, setIsActive] = useState(() => {
    const initialErrors = validate(initialValues, isEdit)
    return isEmptyObj(initialErrors)
  })

  // const router = useRouter()
  // const params = useParams()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    let nextValue: PostForm

    if (name.startsWith('addr.')) {
      const key = name.split('.')[1] as keyof PostForm['addr']

      nextValue = {
        ...values,
        addr: {
          ...values.addr,
          [key]: value,
        },
      }
    } else {
      nextValue = { ...values, [name]: value } as PostForm
    }

    setValues(nextValue)

    const myErrors = validate(nextValue, isEdit)
    setErrors(myErrors)
    setIsActive(isEmptyObj(myErrors))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isActive) onSubmit(values)
    // router.push(`/boards/${params.boardId}`)
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
