export default function validate({ writer, password, title, contents }) {
  const errors = {}

  if (!writer) {
    errors.writer = '작성자가 입력되지 않았습니다.'
  }

  if (!password) {
    errors.password = '비밀번호가 입력되지 않았습니다.'
  }

  if (!title) {
    errors.title = '제목이 작성되지 않았습니다.'
  }

  if (!contents) {
    errors.contents = '내용이 작성되지 않았습니다.'
  }

  return errors
}
