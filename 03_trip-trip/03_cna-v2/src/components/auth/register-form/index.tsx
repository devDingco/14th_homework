'use client'
import { useRegister } from './hook'
import styles from './styles.module.css'
export default function RegisterForm() {
  const { errors, registerValue, handleChange, handleSubmit, SuccessModal } = useRegister()

  return (
    <>
      <form className={styles.formLayout} onSubmit={handleSubmit}>
        <h2 className={styles.title}>회원가입</h2>
        <div className={styles.main}>
          <p>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</p>
          <div className={styles.inputWrapper}>
            {/* 이메일 */}
            <div className={`${styles.inputBlock} ${errors.email ? styles.error : ''}`}>
              <label htmlFor="email">
                이메일 <span>*</span>
              </label>
              <input
                type="text"
                placeholder="이메일을 입력해 주세요"
                onChange={handleChange}
                id="email"
                value={registerValue.email}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            {/* 이름 */}
            <div className={`${styles.inputBlock} ${errors.name ? styles.error : ''}`}>
              <label htmlFor="name">
                이름 <span>*</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력해 주세요"
                onChange={handleChange}
                id="name"
                value={registerValue.name}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            {/* 비밀번호 */}
            <div className={`${styles.inputBlock} ${errors.password ? styles.error : ''}`}>
              <label htmlFor="password">
                비밀번호 <span>*</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                onChange={handleChange}
                id="password"
                value={registerValue.password}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            {/* 비밀번호 확인*/}
            <div className={`${styles.inputBlock} ${errors.passwordConfirm ? styles.error : ''}`}>
              <label htmlFor="passwordConfirm">
                비밀번호 확인 <span>*</span>
              </label>
              <input
                type="text"
                placeholder="비밀번호를 한 번 더 입력해 주세요"
                onChange={handleChange}
                id="passwordConfirm"
                value={registerValue.passwordConfirm}
              />
              {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
            </div>
          </div>
        </div>
        <button type="submit">회원가입</button>
      </form>
      <SuccessModal />
    </>
  )
}
