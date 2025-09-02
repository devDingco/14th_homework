import styles from "./styles.module.css"
import QuestionTitle from "../component/Question";

export default function FAQ (){
    return(
        <div className={styles.FAQfield}>
            <div className={styles.search}>
                <img src='/icons/search.svg'/>
            </div>
            <div className={styles.headerCSS}>
                <div>
                    마이
                </div>
                <div className={styles.profile}>
                    <img src='/images/profile.png' />
                    <div className={styles.name}>
                        임정아
                        <img src='/icons/rightarrow.svg' />
                    </div>
                </div>
            </div>
            <div className={styles.navigationMenu}>
                <div>공지사항</div>
                <div>이벤트</div>
                <div id={styles.selected}>FAQ</div>
                <div>Q&A</div>
            </div>
            <hr />
            <div className={styles.questionfieldCSS}>
                <QuestionTitle number={1} Question="리뷰 작성은 어떻게 하나요?"></QuestionTitle>
                <QuestionTitle number={2} Question="리뷰 수정/삭제는 어떻게 하나요?"></QuestionTitle>
                <QuestionTitle number={3} Question="아이디/비밀번호를 잊어버렸어요"></QuestionTitle>
                <QuestionTitle number={4} Question="회원탈퇴를 하고싶어요."></QuestionTitle>
                <QuestionTitle number={5} Question="출발지 설정은 어떻게 하나요?"></QuestionTitle>
                <QuestionTitle number={6} Question="비밀번호를 변경하고 싶어요"></QuestionTitle>
            </div>
            <hr />
            <div className={styles.tabMenu}>
                <div>
                    <img src='/icons/home.svg' />
                    홈
                </div>
                <div>
                    <img src='/icons/location.svg' />
                    잇츠로드
                </div>
                <div>
                    <img src='/icons/favorite.svg' />
                    마이찜
                </div>
                <div id={styles.tabSelected}>
                    <img src='/icons/person.svg' />
                    마이
                </div>
            </div>
        </div>
    )
}