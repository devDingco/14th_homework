'use client'
import { IconButton } from '@/shared/ui/CustomButton/IconButton'
import styles from './styles.module.css'
import {
  LinkIcon,
  ProfileIcon,
  LocationIcon,
  BadIcon,
  GoodIcon,
  ListIcon,
  EditIcon,
} from '@/assets/icons'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { getYouTubeId } from '@/shared/lib/getYoutubeId'
import { formatUtcToKstYmd } from '@/shared/lib/date/formatUtcToKstYmd'

import Image from 'next/image'
import {
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from '@/shared/api/graphql/graphql'
import CommentForm from '@/features/comments/ui/CommentForm'
import CommentList from '@/features/comments/ui/CommentList'

export default function BoardsDetail() {
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

  if (!params.boardId) return <div>잘못된 접근 입니다.</div>
  if (loading) return <div>로딩 중</div>
  if (error || !data?.fetchBoard) return <div>게시글을 찾을 수 없습니다.</div>

  const { writer, title, contents, youtubeUrl, likeCount, dislikeCount, images, createdAt } =
    data.fetchBoard

  const formattedDate = formatUtcToKstYmd(createdAt)
  const firstImg = images?.[0]
  const imgSrc = firstImg && firstImg.trim() !== '' ? firstImg : '/images/postImg1.png'
  const youtubeId = getYouTubeId(youtubeUrl)

  const handleNavigate = (str: string) => {
    if (str === '목록') router.push('/boards')
    if (str === '수정') router.push(`/boards/${params.boardId}/edit`)
  }

  return (
    <div className={styles['detail-post']}>
      {/* 추후 분리 예정 */}
      {/* details title */}
      <header>
        <h1 className={styles['detail-post-title']}>{title}</h1>
      </header>

      {/* details option */}
      <div className={styles['detail-post-details']}>
        <div className={styles['detail-post-info']}>
          <div className={styles['detail-post-profile']}>
            <ProfileIcon />
            <p>{writer}</p>
          </div>
          <p>{formattedDate}</p>
        </div>
        <hr />
        <div className={styles['detail-post-func']}>
          <LinkIcon />
          <LocationIcon />
        </div>
      </div>

      {/* images */}
      {/* {firstImg && */}
      <Image
        src={imgSrc}
        className={styles['detail-post-image']}
        width={0}
        height={0}
        alt="detail image"
      />
      {/* } */}

      {/* contents */}
      <div className={styles['detail-post-contents']}>{contents}</div>

      {/* youtube link */}
      {youtubeId && (
        <div className={styles['detail-post-youtube']}>
          <iframe src={`https://www.youtube.com/embed/${youtubeId}`}></iframe>
        </div>
      )}

      {/* dis-like button */}
      <div className={styles['detail-post-likes']}>
        <div className={styles['detail-post-like']}>
          <BadIcon />
          <p>{dislikeCount}</p>
        </div>
        <div className={styles['detail-post-like']}>
          <GoodIcon />
          <p>{likeCount}</p>
        </div>
      </div>

      {/* active button */}
      <div className={styles['detail-post-active']}>
        <IconButton content="목록으로" onClick={() => handleNavigate('목록')}>
          <ListIcon />
        </IconButton>
        <IconButton content="수정하기" onClick={() => handleNavigate('수정')}>
          <EditIcon />
        </IconButton>
      </div>

      {/* CommentForm */}
      <CommentForm boardId={params.boardId} />
      {/* CommentList */}
      <CommentList boardId={params.boardId} />
    </div>
  )
}
