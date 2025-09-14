'use client'
import Image from 'next/image'
import triptripLogo from '@assets/triptrip.svg'
import styles from './styles.module.css'
import Link from 'next/link'
import { ChevronRight } from '@mui/icons-material'
export default function Navigation() {
  return (
    <header className={styles.navigation}>
      <div className={styles.active_btns}>
        <Image src={triptripLogo} alt="triptrip_logo" width={51.52} />
        <ul className={styles.menu}>
          <li className={styles.active}>
            <Link href={'/boards'}>트립토크</Link>
          </li>
          <li>
            <Link href={'#'}>숙박권 구매</Link>
          </li>
          <li>
            <Link href={'#'}>마이 페이지</Link>
          </li>
        </ul>
      </div>

      <button className={styles.login_btn}>
        <p>로그인</p>
        <ChevronRight />
      </button>
    </header>
  )
}
