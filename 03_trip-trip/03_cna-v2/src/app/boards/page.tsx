'use client'
import BoardsListComponent from 'components/boards-list/list'
import styles from './styles.module.css'

export default function BoardsPage() {
  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <BoardsListComponent />
      </div>
    </div>
  )
}
