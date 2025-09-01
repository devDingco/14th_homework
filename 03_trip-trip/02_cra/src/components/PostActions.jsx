import { CustomButton } from './CustomButton'
export const PostActions = () => {
  return (
    <div className="post-actions">
      <CustomButton type={'button'} content={'취소'} color={'default'} />
      <CustomButton type={'submit'} content={'등록하기'} color={'blue'} disabled={false} />
    </div>
  )
}
