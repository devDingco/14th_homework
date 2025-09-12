'use client'
import BannerComponent from 'components/boards-list/banner'
import BoardsListComponent from 'components/boards-list/list'
import styles from './styles.module.css'

export default function BoardsPage() {
  return (
    <div className={styles.detailLayout}>
      <BannerComponent />
      <div className={styles.detailBody}>
        <BoardsListComponent />
      </div>
    </div>
  )
}
