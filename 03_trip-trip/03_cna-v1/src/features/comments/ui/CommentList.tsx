import { CloseIcon, EditIcon, ProfileIcon } from '@/assets/icons'
import styles from './CommentList.module.css'
import { useQuery } from '@apollo/client'
import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  FetchBoardCommentsQueryVariables,
} from '@/shared/api/graphql/graphql'
import { formatUtcToKstYmd } from '@/shared/lib/date/formatUtcToKstYmd'
import { CommentListProps } from '../model/types'
import { Rate } from 'antd'

export default function CommentList(props: CommentListProps) {
  const { data, loading } = useQuery<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>(
    FetchBoardCommentsDocument,
    {
      variables: {
        boardId: props.boardId,
      },
    }
  )

  if (loading) return <div>로딩 중입니다.</div>
  if (data?.fetchBoardComments.length === 0)
    return <div style={{ margin: '0 auto' }}>등록된 댓글이 없습니다.</div>

  return (
    <div className={styles['comment-list-container']}>
      {data?.fetchBoardComments?.map((el) => {
        const { _id, writer, contents, rating, createdAt } = el
        const formattedDate = formatUtcToKstYmd(createdAt)
        return (
          <>
            <div className={styles['comment-list-layout']} key={_id}>
              <div className={styles['comment-list-header']}>
                <ProfileIcon />
                <p>{writer}</p>
                <Rate value={rating} disabled />
              </div>
              <p className={styles['comment-list-contents']}>{contents}</p>
              <p className={styles['comment-list-date']}>{formattedDate}</p>

              <div className={styles['comment-list-actives']}>
                <EditIcon />
                <CloseIcon />
              </div>
            </div>
            <div className={styles['comment-list-br']}></div>
          </>
        )
      })}
    </div>
  )
}
