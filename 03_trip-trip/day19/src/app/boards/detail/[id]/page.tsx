'use client'
import { IconButton } from '@/shared/ui/custom-button/IconButton'
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
import { posts } from '@/mocks/posts.mock'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BoardsDetail() {
  const params = useParams<{ id?: string }>()
  const id = params.id ?? '1'
  const post = posts.find((p) => +p.id === +id)

  if (!id) {
    return (
      <div>
        잘못된 접근입니다. <Link href="/">홈으로</Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div>
        게시글을 찾을 수 없어요. <Link href="/">홈으로</Link>
      </div>
    )
  }

  return (
    <div className={styles['detail-post']}>
      {/* details title */}
      <header>
        <h1 className={styles['detail-post-title']}>{post.title}</h1>
      </header>

      {/* details option */}
      <div className={styles['detail-post-details']}>
        <div className={styles['detail-post-info']}>
          <div className={styles['detail-post-profile']}>
            <ProfileIcon />
            <p>{post.writer}</p>
          </div>
          <p>{post.date}</p>
        </div>
        <hr />
        <div className={styles['detail-post-func']}>
          <LinkIcon />
          <LocationIcon />
        </div>
      </div>

      {/* images */}
      <img src={post.images[0]} className={styles['detail-post-image']} />

      {/* contents */}
      <div className={styles['detail-post-contents']}>{post.contents}</div>

      {/* youtube link */}
      <div className={styles['detail-post-youtube']}>
        <iframe src={post.youtubeLink}></iframe>
      </div>

      {/* dis-like button */}
      <div className={styles['detail-post-likes']}>
        <div className={styles['detail-post-like']}>
          <BadIcon />
          <p>{post.dislikes}</p>
        </div>
        <div className={styles['detail-post-like']}>
          <GoodIcon />
          <p>{post.likes}</p>
        </div>
      </div>

      {/* active button */}
      <div className={styles['detail-post-active']}>
        <IconButton content="목록으로">
          <ListIcon />
        </IconButton>
        <IconButton content="수정하기">
          <EditIcon />
        </IconButton>
      </div>
    </div>
  )
}
