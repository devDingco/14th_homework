import { useState } from 'react'
import { isEmptyObj } from '../utils/objectUtils'
const useForm = ({ initialValues, validate }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    const nextValue = { ...values, [name]: value }
    setValues(nextValue)

    const myErrors = validate(nextValue)
    setErrors(myErrors)
    setIsActive(isEmptyObj(myErrors))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('제출버튼이 눌렸습니다.')
    console.log('제출버튼이 눌렸습니다.')
    // console.log('🚀 ~ handleSubmit ~ validate(values):', validate(values))
    // console.log('🚀 ~ handleSubmit ~ values:', values)
    // console.log('🚀 ~ handleSubmit ~ errors:', errors)
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
