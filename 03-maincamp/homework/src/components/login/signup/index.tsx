import styles from './styles.module.css'

export default function SignUp(){

    return(
      <div className={styles.container}>
            <div className={styles.signUpHeader}>
                <div className={styles.signUpBox}>
                    <div className={styles.signUpForm}>
                        <h1>회원가입</h1>
                        <div className={styles.signUpInputBox}>
                            <h2>회원가입을 위해 아래 빈칸을 모두 채워주세요</h2>
                            <div className={styles.signUpInputs}>
                                <div className={styles.signUpInputs__item}>
                                    <h3>이메일 <div>*</div></h3>
                                    <input placeholder="이메일을 입력해 주세요" type="text" />
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>이름 <div>*</div></h3>
                                    <input placeholder="이름을 입력해 주세요" type="text" />
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>비밀번호 <div>*</div></h3>
                                    <input placeholder="비밀번호를 입력해 주세요" type="password" />
                                </div>
                                <div className={styles.signUpInputs__item}>
                                    <h3>비밀번호 확인 <div>*</div></h3>
                                    <input placeholder="비밀번호를 한번 더 입력해 주세요" type="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.signUpBtn}>회원가입</button>
                </div>
            </div>
            <img className={styles.loginBg} src="/images/loginBg.png" alt="" />
        </div>
    )
}