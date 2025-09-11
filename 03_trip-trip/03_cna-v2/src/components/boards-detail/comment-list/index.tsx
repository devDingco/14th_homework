import profileImage from '@assets/profile_image.png'
import Image from 'next/image'
import styles from './styles.module.css'
import { useQuery } from '@apollo/client'
import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  FetchBoardCommentsQueryVariables,
} from 'commons/graphql/graphql'
import { CommentListProps } from './types'
import { Rate } from 'antd'
import { CloseOutlined, EditOutlined } from '@mui/icons-material'
import { formatDate } from 'commons/utils/formatDate'
const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: '프로필이미지',
  },
}

export default function CommentListComponent(props: CommentListProps) {
  const { data, loading } = useQuery<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>(
    FetchBoardCommentsDocument,
    {
      variables: { boardId: props.boardId },
    }
  )
  const reverse = data?.fetchBoardComments.toReversed()

  if (loading) return <div>로딩 중 입니다</div>
  if (data?.fetchBoardComments?.length === 0)
    return <div style={{ color: '#777' }}>등록된 댓글이 없습니다.</div>

  return (
    <>
      {reverse?.map((el) => {
        const { _id, writer, contents, rating, createdAt } = el
        const formattedDate = formatDate(createdAt)
        return (
          <>
            <div className={styles.comment_list_layout} key={_id}>
              <div className={styles.comment_list_title}>
                <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
                <p className={styles.comment_writer}>{writer}</p>
                <Rate defaultValue={rating} disabled />
              </div>
              <p className={styles.comment_contents}>{contents}</p>
              <p className={styles.comment_date}>{formattedDate}</p>

              <div className={styles.active_images}>
                <EditOutlined style={{ width: '20px', height: '20px' }} />
                <CloseOutlined style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
            <div className={styles.border_line}></div>
          </>
        )
      })}
    </>
  )
}
