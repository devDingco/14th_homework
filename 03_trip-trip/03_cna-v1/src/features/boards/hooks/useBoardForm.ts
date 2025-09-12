'use client'
import { ChangeEvent, useState } from 'react'
import { isEmptyObj } from '../model/utils'
import { PostForm, ValidateErrors, ValidateValues } from '../model/types'

export interface UseFormReturn {
  values: PostForm
  errors: ValidateErrors
  isActive: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setAddress: (addr: { zipcode: string; addr1: string }) => void
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
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

    const nextErrors = validate(nextValue, isEdit)
    setErrors(nextErrors)
    setIsActive(isEmptyObj(nextErrors))
  }

  const setAddress = (addr: { zipcode: string; addr1: string }) => {
    const nextValue = {
      ...values,
      addr: {
        ...values.addr,
        zipcode: addr.zipcode,
        addr1: addr.addr1,
      },
    }
    setValues(nextValue)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isActive) onSubmit(values)
  }

  return {
    values,
    errors,
    isActive,
    handleChange,
    handleSubmit,
    setAddress,
  }
}

export default useForm
