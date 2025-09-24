'use client'

import { registerValidation } from 'commons/libraries/validation/register-validation'
import { ChangeEvent, FormEvent, useState } from 'react'

const initialState = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
}

export const useRegister = () => {
  const [registerValue, setRegisterValue] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setRegisterValue((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors(registerValidation(registerValue))
  }
  return { errors, registerValue, handleChange, handleSubmit }
}
