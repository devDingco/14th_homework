import styles from './DataList.module.css'

export default function DataList ({children, headerCell, flex, textAlign, BoardsCount, currentPage, changeCurrentPage}:{children: React.ReactNode,headerCell: string[], flex: string[], textAlign: CanvasTextAlign[], BoardsCount?: number, currentPage?: number, changeCurrentPage?:(newNum: number) => void}) {

    const ListHeader = headerCell.map((el, index) => (
        <div 
        key={index} 
        style={{
            flex:`${flex[index]}`, 
            textAlign: textAlign[index] ?? 'center'
        }}
        >{el}</div>
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
            {/* <Pagination BoardsCount={BoardsCount} currentPage={currentPage} changeCurrentPage={changeCurrentPage}></Pagination> */}
        </div>
    )
}