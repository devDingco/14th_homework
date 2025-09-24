'use client'

import { useMutation } from '@apollo/client'
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
} from 'commons/graphql/graphql'
import { registerValidation } from 'commons/libraries/validation/register-validation'
import { isEmptyObj } from 'commons/utils/isEmptyObj'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const initialState = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
}

export const useRegister = () => {
  const router = useRouter()
  const [registerValue, setRegisterValue] = useState(initialState)
  const [errors, setErrors] = useState({})

  const [createUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setRegisterValue((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = registerValidation(registerValue)
    setErrors(nextErrors)
    if (!isEmptyObj(nextErrors)) return

    try {
      const { data } = await createUser({
        variables: {
          createUserInput: {
            email: registerValue.email,
            name: registerValue.name,
            password: registerValue.password,
          },
        },
      })
      if (data?.createUser?._id) router.push('/login')
    } catch (error) {
      console.error('회원가입에 실패하였습니다:', error)
    }
  }

  return { errors, registerValue, handleChange, handleSubmit }
}
