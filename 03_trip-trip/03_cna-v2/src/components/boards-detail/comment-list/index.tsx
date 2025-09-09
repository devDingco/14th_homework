import profileImage from '@assets/profile_image.png'
import editImage from '@assets/edit.png'
import closeImage from '@assets/close.png'
import Image from 'next/image'
import styles from './styles.module.css'

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

export default function CommentListComponent() {
  return (
    <div className={styles.comment_list_layout}>
      <div className={styles.comment_list_title}>
        <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
        <p className={styles.comment_writer}>홍길동</p>
        <p>대충 별점 이미지 들어가는 곳</p>
      </div>
      <p className={styles.comment_contents}>대충 댓글 내용</p>
      <p className={styles.comment_date}>2024.11.11</p>

      <div className={styles.active_images}>
        <Image src={IMAGE_SRC.editImage.src} alt={IMAGE_SRC.editImage.alt} />
        <Image src={IMAGE_SRC.closeImage.src} alt={IMAGE_SRC.closeImage.alt} />
      </div>
    </div>
  )
}
