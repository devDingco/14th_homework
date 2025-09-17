import { formatDate } from 'commons/utils/formatDate'
import Image from 'next/image'
import styles from './styles.module.css'
import { Rate } from 'antd'
import { CloseOutlined, EditOutlined } from '@mui/icons-material'
import profileImage from '@assets/profile_image.png'
import { Fragment, useState } from 'react'
import CommentWriteComponent from '../comment-write'
import { CommentListItemProps } from './types'

const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: '프로필이미지',
  },
}

export default function CommentListItem({ el, boardId }: CommentListItemProps) {
  const { _id, writer, contents, rating, createdAt } = el
  const formattedDate = formatDate(createdAt)

  const [isEdit, setIsEdit] = useState(false)
  const onClickEdit = () => {
    setIsEdit(!isEdit)
  }

  return isEdit ? (
    <CommentWriteComponent
      boardId={boardId}
      el={el}
      isEdit={isEdit}
      onClickEdit={onClickEdit}
      key={_id}
    />
  ) : (
    <Fragment key={_id}>
      <div className={styles.comment_list_layout}>
        <div className={styles.comment_list_title}>
          <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
          <p className={styles.comment_writer}>{writer}</p>
          <Rate defaultValue={rating} disabled />
        </div>
        <p className={styles.comment_contents}>{contents}</p>
        <p className={styles.comment_date}>{formattedDate}</p>

        <div className={styles.active_images}>
          <EditOutlined style={{ width: '20px', height: '20px' }} onClick={onClickEdit} />
          <CloseOutlined style={{ width: '20px', height: '20px' }} />
        </div>
      </div>
      <div className={styles.border_line}></div>
    </Fragment>
  )
}
