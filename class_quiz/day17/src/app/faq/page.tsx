import styles from './styles.module.css'
import { IoSearchSharp, IoChevronDownOutline } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import { GrHomeRounded, GrLocation } from 'react-icons/gr'
import { GoHeart } from 'react-icons/go'
import { FaUserLarge } from 'react-icons/fa6'
export default function FaqPage() {
  return (
    <div className={styles.myPage}>
      <IoSearchSharp size={32} />
      {/* title + goToProfile */}
      <div className={styles.header}>
        <p className={styles.title}>마이</p>
        <div>
          <img src="/img-profile.png" />
          <div className={styles.profile}>
            <p className={styles.name}>임정아</p>
            <IoIosArrowForward size={28} fill={'var(--color-gray-500)'} />
          </div>
        </div>
      </div>
      {/* navigator */}
      <div className={styles.nav}>
        <p>공지사항</p>
        <p>이벤트</p>
        <p className={styles.active}>FAQ</p>
        <p>Q&A</p>
      </div>
      <hr className="line" />

      <div className={styles.questions}>
        {/* Q1 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 01</p>
            <p className={styles.questionTitle}>리뷰 작성은 어떻게 하나요?</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
        {/* Q2 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 02</p>
            <p className={styles.questionTitle}>리뷰 수정/삭제는 어떻게 하나요?</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
        {/* Q3 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 03</p>
            <p className={styles.questionTitle}>아이디 비밀번호를 잊어버렸어요.</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
        {/* Q4 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 04</p>
            <p className={styles.questionTitle}>회원탈퇴를 하고싶어요.</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
        {/* Q5 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 05</p>
            <p className={styles.questionTitle}>출발지 설정은 어떻게 하나요?</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
        {/* Q6 */}
        <div className={styles.question}>
          <div>
            <p className={styles.num}>Q. 06</p>
            <p className={styles.questionTitle}>비밀번호를 변경하고 싶어요.</p>
          </div>
          <IoChevronDownOutline size={40} />
        </div>
      </div>
      <hr />

      {/* footer */}
      <div className={styles.footer}>
        <div>
          <GrHomeRounded size={40} />
          <p>홈</p>
        </div>
        <div>
          <GrLocation size={40} />
          <p>잇츠로드</p>
        </div>
        <div>
          <GoHeart size={40} />
          <p>마이찜</p>
        </div>
        <div className={styles.iconActive}>
          <FaUserLarge size={40} />
          <p>마이</p>
        </div>
      </div>
    </div>
  )
}
