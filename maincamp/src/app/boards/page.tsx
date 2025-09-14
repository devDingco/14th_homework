"use client"

import BoardsList from "@/components/features/boards/boards-list/list"
import BoardsBanner from "@/commons/layout/banner"
import styles from './styles.module.css'


export default function BoardsPage () {

    return(
        <div className={styles.boards}>
            <BoardsList />
        </div>
    )
}