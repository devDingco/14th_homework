import profileImage from '@assets/profile_image.png'
import editImage from '@assets/edit.png'
import closeImage from '@assets/close.png'
import Image from 'next/image'
import styles from './styles.module.css'
import { useQuery } from '@apollo/client'
import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  FetchBoardCommentsQueryVariables,
} from 'commons/graphql/graphql'

const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: '프로필이미지',
  },
  editImage: {
    src: editImage,
    alt: '수정이미지',
  },
  closeImage: {
    src: closeImage,
    alt: '닫기이미지',
  },
}

interface CommentListProps {
  boardId: string
}
export default function CommentListComponent(props: CommentListProps) {
  const { data, loading } = useQuery<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>(
    FetchBoardCommentsDocument,
    {
      variables: { boardId: props.boardId },
    }
  )

  if (loading) return <div>로딩 중 입니다</div>

  return (
    <>
      {data?.fetchBoardComments.map((el) => {
        const { _id, writer, contents, rating, createdAt } = el
        return (
          <div className={styles.comment_list_layout} key={_id}>
            <div className={styles.comment_list_title}>
              <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
              <p className={styles.comment_writer}>{writer}</p>
              <p>대충 별점 이미지 들어가는 곳 : {rating}점</p>
            </div>
            <p className={styles.comment_contents}>{contents}</p>
            <p className={styles.comment_date}>{createdAt}</p>

            <div className={styles.active_images}>
              <Image src={IMAGE_SRC.editImage.src} alt={IMAGE_SRC.editImage.alt} />
              <Image src={IMAGE_SRC.closeImage.src} alt={IMAGE_SRC.closeImage.alt} />
            </div>
          </div>
        )
      })}
    </>
  )
}
