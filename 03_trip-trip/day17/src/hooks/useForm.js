import { useState } from 'react'
import { isEmptyObj } from '../utils/objectUtils'
import { useNavigate } from 'react-router'

const useForm = ({ initialValues, validate }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()
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
    navigate('/boards/detail/1')
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
