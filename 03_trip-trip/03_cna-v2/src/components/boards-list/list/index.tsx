import styles from './styles.module.css'
import deleteImage from '@assets/delete.png'
import Image from 'next/image'
import useBoardsList from './hook'
import { useState } from 'react'
import { BoardsListProps } from './types'

const IMAGE_SRC = {
  deleteImage: {
    src: deleteImage,
    alt: '삭제버튼',
  },
}

export default function BoardsListComponent(props: BoardsListProps) {
  const { data, dataBoardsCount, currentPage } = props
  const [hoveredId, setHoveredId] = useState('')

  const { onClickDelete, onClickDetail } = useBoardsList({ hoveredId })

  return (
    <div className={styles.boardInnerBody}>
      <div className={styles.boardHeader}>
        <div className={styles.headerNumber}>번호</div>
        <div className={styles.headerTitle}>제목</div>
        <div className={styles.headerWriter}>작성자</div>
        <div className={styles.headerDate}>날짜</div>
        <button className={styles.hidden}>
          <Image src={IMAGE_SRC.deleteImage.src} alt={IMAGE_SRC.deleteImage.alt} />
        </button>
      </div>
      <div className={styles.contentBody}>
        {data?.fetchBoards?.map((el, index) => (
          <button
            onClick={(event) => onClickDetail(event, el?._id)}
            key={el._id}
            className={styles.contentContainer}
            onMouseEnter={() => setHoveredId(el._id)}
            onMouseLeave={() => setHoveredId('')}
          >
            <div className={styles.contentNumber}>
              {dataBoardsCount?.fetchBoardsCount - index - 10 * (currentPage - 1)}
            </div>
            <div className={styles.contentTitle}>{el.title}</div>
            <div className={styles.contentWriter}>{el.writer}</div>
            <div className={styles.contentDate}>
              {el.createdAt.split('T')[0].replace(/-/g, '.')}
            </div>
            <div>
              <span
                onClick={onClickDelete}
                className={hoveredId === el._id ? styles.showButton : styles.hidden}
              >
                <Image
                  src={IMAGE_SRC.deleteImage.src}
                  alt={IMAGE_SRC.deleteImage.alt}
                  width={0}
                  height={0}
                />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
