import BoardForm from '@/features/boards/ui/BoardForm'
import styles from './styles.module.css'

export default function BoardsNew() {
  return (
    <div className={styles['post']}>
      <header>
        <h1 className={styles['header-title']}>게시물 등록</h1>
      </header>
      <BoardForm />
    </div>
  )
}
