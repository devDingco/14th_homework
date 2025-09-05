import styles from './DataList.module.css'
import Pagination from './Pagination'

export default function DataList ({children, headerCell, flex, textAlign, BoardsCount, currentPage, changeCurrentPage}:{children: React.ReactNode,headerCell: string[], flex: number[], textAlign: string[], BoardsCount: number, currentPage: number, changeCurrentPage:void}) {

    const ListHeader = headerCell.map((el, index) => (
        <div key={index} style={{flex:`${flex[index]}`, textAlign:`${textAlign[index]}`}}>{el}</div>
    ))

    return(
        <div className={styles.DataListContainer}>
            {/* List Header */}
            <div className={styles.ListHeader}>
            {ListHeader}           
            </div>
            {/* List Row ... */}
            <div className={styles.ListRowContainer}>
                {children}
            </div>
            {/* List Pages */}
            <Pagination BoardsCount={BoardsCount} currentPage={currentPage} changeCurrentPage={changeCurrentPage}></Pagination>
        </div>
    )
}