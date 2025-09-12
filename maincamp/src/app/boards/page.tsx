"use client"

import BoardsList from "@/components/features/boards/boards-list/list"
import BoardsBanner from "@/components/features/boards/boards-list/banner"
import styles from './styles.module.css'


export default function BoardsPage () {

    return(
        <div className={styles.boards}>
            <BoardsBanner />
            <BoardsList />
        </div>
    )
}