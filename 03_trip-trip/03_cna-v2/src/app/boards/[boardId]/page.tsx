import BoardDetailPage from 'components/boards-detail/detail'
import styles from './styles.module.css'
import CommentWriteComponent from 'components/boards-detail/comment-write'
import CommentListComponent from 'components/boards-detail/comment-list'

export default function BoardsDetailPage() {
  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <BoardDetailPage />
        <CommentWriteComponent />
        <CommentListComponent />
      </div>
    </div>
  )
}
