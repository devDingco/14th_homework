'use client'
import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import profileImage from '@assets/profile_image.png'
import cheongsanImage from '@assets/cheongsan.png'
import {
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from 'commons/graphql/graphql'
import {
  HeartBrokenOutlined,
  FavoriteBorderOutlined,
  LinkOutlined,
  PlaceOutlined,
  MenuOutlined,
  EditOutlined,
} from '@mui/icons-material'
import { Tooltip } from 'antd'
import { formatDate } from 'commons/utils/formatDate'

const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: '프로필이미지',
  },
  cheongsanImage: {
    src: cheongsanImage,
    alt: '청산사진',
  },
} as const

export default function BoardDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = typeof params.boardId === 'string' ? params.boardId : ''

  const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
    variables: { boardId: id },
  })
  console.log('🚀 ~ BoardDetailPage ~ data:', data)

  const goToEditPage = () => {
    router.push(`${id}/edit`)
  }

  const goToBoardsPage = () => {
    router.push(`/boards`)
  }

  return (
    <div className={styles.detailFrame}>
      <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
      <div className={styles.detailMetadataContainer}>
        <div className={styles.detailMetadataProfile}>
          <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
          <div> {data?.fetchBoard?.writer}</div>
        </div>
        <div className={styles.detailMetadataDate}>{formatDate(data?.fetchBoard?.createdAt)}</div>
      </div>
      <div className={styles.enrollBorder}></div>
      <div className={styles.detailMetadataIconContainer}>
        <LinkOutlined />

        <Tooltip
          placement="bottomRight"
          title={data?.fetchBoard?.boardAddress?.address}
          arrow={false}
          color="white"
          overlayInnerStyle={{ color: 'black' }}
        >
          <PlaceOutlined />
        </Tooltip>
      </div>
      <div className={styles.detailContentContainer}>
        <Image
          src={IMAGE_SRC.cheongsanImage.src}
          alt={IMAGE_SRC.cheongsanImage.alt}
          className={styles.detailContentImage}
        />
        <div className={styles.detailContentText}>{data?.fetchBoard?.contents}</div>
        {data?.fetchBoard?.youtubeUrl && (
          <div className={styles.youtube}>
            <ReactPlayer src={data?.fetchBoard?.youtubeUrl} controls width={822} height={464} />
          </div>
        )}

        <div className={styles.detailContentGoodOrBad}>
          <div className={styles.detailGoodContainer}>
            <HeartBrokenOutlined style={{ color: '#5F5F5F' }} />
            <div className={styles.detailBadText}>24</div>
          </div>
          <div className={styles.detailGoodContainer}>
            <FavoriteBorderOutlined style={{ color: '#F66A6A' }} />
            <div className={styles.detailGoodText}>12</div>
          </div>
        </div>
        <div className={styles.detailButtonsContainer}>
          <button className={styles.detailButton} onClick={goToBoardsPage}>
            <MenuOutlined />
            <div>목록으로</div>
          </button>
          <button className={styles.detailButton} onClick={goToEditPage}>
            <EditOutlined />
            <div>수정하기</div>
          </button>
        </div>
      </div>
    </div>
  )
}
