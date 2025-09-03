import { ValidateErrors, ValidateValues } from './types'

export default function validate(values: ValidateValues): ValidateErrors {
  const errors: ValidateErrors = {}

  if (!values.writer) {
    errors.writer = '작성자가 입력되지 않았습니다.'
  }

  if (!values.password) {
    errors.password = '비밀번호가 입력되지 않았습니다.'
  }

  if (!values.title) {
    errors.title = '제목이 작성되지 않았습니다.'
  }

  if (!values.contents) {
    errors.contents = '내용이 작성되지 않았습니다.'
  }

  return errors
}
