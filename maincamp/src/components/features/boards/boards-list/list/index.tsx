"use client"

import styles from './styles.module.css'
import ListRow from "@/components/ui/list/ListRow"
import { Fragment } from "react"
import { BoardType, IBoardsListProps } from './types'


export default function BoardsList (props: IBoardsListProps) {

    return(
            <div className={styles.ListRows}>
                {props.data?.map((el: BoardType, index: number) => {
                    return(
                        <Fragment key={el._id}>
                        <ListRow
                            num={props.pageNum[index]}
                            flex={props.flex}
                            textAlign={props.textAlign}
                            _id={el._id}
                            title={el.title}
                            writer={el.writer as string}
                            createdAt={el.createdAt}
                            currentPage={props.currentPage}
                            refetch={props.refetch}
                        >
                        </ListRow>
                        </Fragment>
                    )
                })}
            </div>
    )
}