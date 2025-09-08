'use client'
import BoardForm from '@/features/boards/ui/BoardForm'
import styles from './styles.module.css'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from '@/features/boards/api/mutation'
import { useRouter } from 'next/navigation'

export default function BoardsNew() {
  const router = useRouter()
  const [createBoard] = useMutation(CREATE_BOARD)

  const handleCreateSubmit = async (data) => {
    const { writer, password, title, contents, link, addr, img_src } = data
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            youtubeUrl: link,
            boardAddress: {
              zipcode: addr?.zipcode,
              address: addr?.addr1,
              addressDetail: addr?.addr2,
            },
            images: img_src,
          },
        },
      })

      alert('제출버튼이 눌렸습니다.')
      router.push(`/boards/${result?.data?.createBoard._id}`)
    } catch (error) {
      alert(error ?? '에러가 발생하였습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <div className={styles['post']}>
      <header>
        <h1 className={styles['header-title']}>게시물 등록</h1>
      </header>
      <BoardForm isEdit={false} onSubmit={handleCreateSubmit} />
    </div>
  )
}
