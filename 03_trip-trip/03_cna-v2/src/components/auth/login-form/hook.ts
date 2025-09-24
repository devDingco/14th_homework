'use client'
import { useMutation } from '@apollo/client'
import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from 'commons/graphql/graphql'
import { loginValidation } from 'commons/libraries/validation/login-validation'
import { ChangeEvent, FormEvent, useState } from 'react'
const initialState = {
  email: '',
  password: '',
}

export const useLogin = () => {
  const [loginValue, setLoginValue] = useState(initialState)
  const [isError, setIsError] = useState(false)

  const [loginUser] = useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValue((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = !loginValidation(loginValue)
    setIsError(isValid)
  }

  return {
    isError,
    loginValue,
    handleChange,
    handleSubmit,
  }
}
