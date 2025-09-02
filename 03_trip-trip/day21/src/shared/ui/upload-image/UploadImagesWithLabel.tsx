import UploadImage from './UploadImage'
import styles from './UploadImage.module.css'

export default function UploadImagesWithLabel() {
  return (
    <div className={styles['post-form-upload-imgs']}>
      <label>사진 첨부</label>
      <div className={styles['post-form-img-col']}>
        <UploadImage />
        <UploadImage />
        <UploadImage />
      </div>
    </div>
  )
}
