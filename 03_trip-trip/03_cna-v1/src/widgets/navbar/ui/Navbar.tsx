import Link from 'next/link'
import styles from './styles.module.css'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav>
        <Link href={'#'}>a</Link>
        <Link href={'#'}>b</Link>
        <Link href={'#'}>c</Link>
      </nav>
      <div>로그인</div>
    </header>
  )
}
