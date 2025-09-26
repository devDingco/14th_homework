"use client"

import useLayoutNavigation from './hook'
import styles from './styles.module.css'

const LayoutNavigation = () => {

    const { goDetailHandler, goCreateBoardHandler, goGetCatsHandler, goMyApisHandler } = useLayoutNavigation()

    return (
        <div className={`${styles.header_frame} flex_row flex_justi_center`}>
            <div className={`${styles.header} flex_row flex_justi_sb`}>
                <div className={`${styles.navigation} flex_row flex_justi_sb`}>
                    <div className={`${styles.logo_area}`} onClick={goDetailHandler}>
                        <img src="/image/logo.png"/>
                    </div>
                    <ul className={`${styles.navigation_tab} flex_row`}>
                        <li><p className='me_16_24'>트립토크</p></li>
                        <li><p className='me_16_24'>숙박권 구매</p></li>
                        <li><p className='me_16_24'>마이 페이지</p></li>
                        <li onClick={goGetCatsHandler}><p className='me_16_24' style={{ whiteSpace: "" }}>고양이를<br/>보러가자</p></li>
                        <li onClick={goMyApisHandler}><p className='me_16_24' style={{ whiteSpace: "" }}>MyAPIs</p></li>
                        <li onClick={goCreateBoardHandler}><p className='me_16_24'>게시물 등록</p></li>
                    </ul>
                </div>
                <div className={`${styles.header_profile_frame}`}>
                    <div className={`${styles.header_profile} flex_row flex_align_items_center`}>
                        <img src="/svg/person.png" />
                        <img src="/svg/down_arrow.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutNavigation