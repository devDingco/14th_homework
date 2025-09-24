import styles from './styles.module.css'
export default function RegisterForm() {
  return (
    <form className={styles.formLayout}>
      <h2 className={styles.title}>회원가입</h2>
      <div className={styles.main}>
        <p>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</p>
        <div className={styles.inputWrapper}>
          {/* 이메일 */}
          <div className={styles.inputBlock}>
            <label>
              이메일 <span>*</span>
            </label>
            <input type="text" placeholder="이메일을 입력해 주세요" />
            <p>이메일을 입력해 주세요.</p>
          </div>
          {/* 이름 */}
          <div className={styles.inputBlock}>
            <label>
              이름 <span>*</span>
            </label>
            <input type="text" placeholder="이름을 입력해 주세요" />
            <p>이름을 입력해 주세요.</p>
          </div>
          {/* 비밀번호 */}
          <div className={styles.inputBlock}>
            <label>
              비밀번호 <span>*</span>
            </label>
            <input type="password" placeholder="비밀번호를 입력해 주세요" />
            <p>비밀번호를 입력해 주세요.</p>
          </div>
          {/* 비밀번호 확인*/}
          <div className={styles.inputBlock}>
            <label>
              비밀번호 확인 <span>*</span>
            </label>
            <input type="text" placeholder="비밀번호를 한 번 더 입력해 주세요" />
            <p>비밀번호를 입력해 주세요.</p>
          </div>
        </div>
      </div>
      <button type="submit">회원가입</button>
    </form>
  )
}
