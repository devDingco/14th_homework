import { useState } from 'react'
import { isEmptyObj } from '../utils/objectUtils'
const useForm = ({ initialValues, validate }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const myErrors = validate(values)
    setErrors(myErrors)

    if (isEmptyObj(myErrors)) alert('게시글 등록이 가능한 상태입니다!')
    // console.log('🚀 ~ handleSubmit ~ validate(values):', validate(values))
    // console.log('🚀 ~ handleSubmit ~ values:', values)
    // console.log('🚀 ~ handleSubmit ~ errors:', errors)
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  }
}

export default useForm
