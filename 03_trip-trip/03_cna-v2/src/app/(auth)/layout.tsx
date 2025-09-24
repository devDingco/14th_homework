'use client'
import Image from 'next/image'
import styles from './styles.module.css'
import AuthImage from 'assets/login.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.authLayout}>
      <section className={styles.pageLayout}>{children}</section>
      <section>
        <Image src={AuthImage} alt={'로그인 메인 이미지'} width={1520} height={1080} />
      </section>
    </div>
  )
}
