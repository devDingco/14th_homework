'use client'
import { ApolloError, useMutation } from '@apollo/client'
import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from 'commons/graphql/graphql'
import { loginValidation } from 'commons/libraries/validation/login-validation'
import { useAccessTokenStore } from 'commons/stores/access-token-store'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
const initialState = {
  email: '',
  password: '',
}

export const useLogin = () => {
  const router = useRouter()
  const [loginValue, setLoginValue] = useState(initialState)
  const [isError, setIsError] = useState(false)

  const [loginUser] = useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument)
  const { setAccessToken } = useAccessTokenStore()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValue((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = !loginValidation(loginValue)
    setIsError(isValid)
    if (isValid) return

    try {
      const { data } = await loginUser({
        variables: {
          email: loginValue.email,
          password: loginValue.password,
        },
      })
      const accessToken = data?.loginUser?.accessToken ?? ''
      setAccessToken(accessToken)

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        router.push('/boards')
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        alert(error?.message)
      }
      console.error('로그인에 실패하였습니다:', error)
    }
  }

  return {
    isError,
    loginValue,
    handleChange,
    handleSubmit,
  }
}
