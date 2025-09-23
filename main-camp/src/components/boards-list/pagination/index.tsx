"use client"

import styles from './styles.module.css'

const ListPagination = () => {
    return (
        <div className={`${styles.pagination} flex_row flex_justi_center`}>
            <img src="/svg/left_arrow.png"/>
                <ul className={`${styles.pageList} flex_row`}>
                    <li style={{ background: "rgba(242, 242, 242, 1);" }}><button className='me_16_24' style={{ color: "rgba(0, 0, 0, 1);" }}>1</button></li>
                    <li><button className='r_16_24' style={{ color: "rgba(119, 119, 119, 1);" }}>2</button></li>
                    <li><button className='r_16_24' style={{ color: "rgba(119, 119, 119, 1);" }}>3</button></li>
                    <li><button className='r_16_24' style={{ color: "rgba(119, 119, 119, 1);" }}>4</button></li>
                    <li><button className='r_16_24' style={{ color: "rgba(119, 119, 119, 1);" }}>5</button></li>
                </ul>
            <img src="/svg/right_arrow.png"/>
        </div>
    )
}

export default ListPagination