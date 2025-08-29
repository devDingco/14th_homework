'use client'
import { ChangeEvent, useState } from 'react'
import { isEmptyObj } from '../model/utils'
import { PostForm, ValidateErrors, ValidateValues } from '../model/types'
import { useRouter } from 'next/navigation'

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
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()
  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    const nextValue = { ...values, [name]: value }
    setValues(nextValue)

    const myErrors = validate(nextValue)
    setErrors(myErrors)
    setIsActive(isEmptyObj(myErrors))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
