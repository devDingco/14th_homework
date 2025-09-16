"use client"

import BoardsList from "@/components/boards-list/list"
import styles from './styles.module.css'
import BoardsBanner from "@/components/boards-list/banner"

const BoardsListPage = () => {
    return (
        <div id="main" className={`${styles.boards_main}`}>
            <BoardsList />
        </div>
    )
}

export default BoardsListPage