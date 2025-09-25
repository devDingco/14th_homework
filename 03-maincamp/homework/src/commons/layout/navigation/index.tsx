"use client"
import styles from './styles.module.css'


export default function LayoutNavigation(){
    
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.main}>
                    <img className={styles.main__logo} src="/images/logo.png" alt="" />
                    <ul className={styles.main__menu}>
                        <li className={styles.main__menu__item}>트립토크</li>
                        <li className={styles.main__menu__item}>숙박권 구매</li>
                        <li className={styles.main__menu__item}>마이 페이지</li>
                        
                        
                    </ul>
                </div>
                <div className={styles.sub}>
                    <img src="/images/user.png" alt="" />
                    <img src="/images/down_arrow.png" alt="" />
                </div>
            </div>
        </div>
    )
}