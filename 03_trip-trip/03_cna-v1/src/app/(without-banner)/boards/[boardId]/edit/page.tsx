'use client'
import BoardForm from '@/features/boards/ui/BoardForm'
import styles from './styles.module.css'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import {
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
  UpdateBoardDocument,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
} from '@/shared/api/graphql/graphql'
import { PostForm } from '@/features/boards/model/types'

export default function BoardEditPage() {
  const router = useRouter()
  const params = useParams<{ boardId: string }>()
  const { data, loading, error } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    {
      variables: {
        boardId: params.boardId,
      },
    }
  )

  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument
  )

  const handleUpdateSubmit = async (data: PostForm) => {
    const updatePassword = prompt('글을 입력할때 입력하셨던 비밀번호를 입력해주세요')

    const { title, contents, link, addr, img_src } = data
    try {
      const { data } = await updateBoard({
        variables: {
          updateBoardInput: {
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
          password: updatePassword,
          boardId: params.boardId,
        },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: {
              boardId: params.boardId,
            },
          },
          { query: FetchBoardsDocument },
          { query: FetchBoardsCountDocument },
        ],
      })

      const boardId = data?.updateBoard?._id
      router.push(`/boards/${boardId}`)
    } catch (error) {
      // CONSIDER: 다시 보기
      if (error instanceof ApolloError) {
        if (error.graphQLErrors?.length > 0) alert(error.graphQLErrors[0].message)
      } else alert(error ?? '에러가 발생하였습니다. 다시 시도해 주세요.')
    }
  }

  if (!params.boardId) return <div>잘못된 접근 입니다.</div>
  if (loading) return <div>로딩 중입니다</div>
  if (error || !data?.fetchBoard) return <div>게시글을 찾을 수 없습니다.</div>

  return (
    <div className={styles['post']}>
      <header>
        <h1 className={styles['header-title']}>게시물 수정</h1>
      </header>
      <BoardForm isEdit={true} data={data} onSubmit={handleUpdateSubmit} />
    </div>
  )
}
