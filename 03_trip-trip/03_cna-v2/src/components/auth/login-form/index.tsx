'use client'
import Logo from 'assets/triptrip.svg'
import Image from 'next/image'
import styles from './styles.module.css'

export default function LoginForm() {
  return (
    <form className={styles.formLayout}>
      <Image src={Logo} alt={'triptrip 로고'} width={120} height={0} />
      <h2 className={styles.title}>트립트립에 오신걸 환영합니다.</h2>
      <div className={styles.main}>
        <p>트립트립에 로그인 하세요.</p>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <input placeholder="이메일을 입력해 주세요." />
            <input placeholder="비밀번호를 입력해 주세요." />
          </div>
          <p>아이디 또는 비밀번호를 확인해 주세요.</p>
        </div>
      </div>
      <button type="submit">로그인</button>
      <p>회원가입</p>
    </form>
  )
}
