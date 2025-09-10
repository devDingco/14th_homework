"use client";

import styles from "./styles.module.css"; // 스타일 다 바꿔주기 - 형식 맞게

// Register 관련 컴포넌트들 불러오기
import { RegisterInput, RegisterText, Picture, Button } from './Register';
import { useBoardWrite } from "./hook";
import { IBoardWriteProps } from "./types";

  const BoardWrite: React.FC<IBoardWriteProps> = ({isEdit, boardId}) => {

    const {
      writer,
      setWriter,
      password,
      setPassword,
      title,
      setTitle,
      contents,
      setContents,
      loading,
      handleSubmit,
      handleUpdate,
    } = useBoardWrite({ isEdit, boardId });

  return (
    <div className={styles.등록페이지}>

        <div className={styles.타이틀}>{isEdit ? "게시물 수정" : "게시물 등록"}</div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="작성자" myPlaceholder="작성자 명을 입력해 주세요." width="62.0rem"
                            value={writer ?? ""} onChange={(val: string) => setWriter(val)} readOnly={isEdit} />
            <RegisterInput inputTitle="비밀번호" myPlaceholder="비밀번호를 입력해 주세요." width="62.0rem" type="password"
                            value={password ?? ""} onChange={(val: string) => setPassword(val)} readOnly={isEdit} />
        </div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="제목" myPlaceholder="제목을 입력해 주세요." width="128.0rem"
                            value={title ?? ""} onChange={(val: string) => setTitle(val)}/>
        </div>

        <div className={styles.SectionNoLine}>
            <RegisterText inputTitle="내용" myPlaceholder="내용을 입력해 주세요." width="128.0rem" height="33.6rem"
                            value={contents ?? ""} onChange={(val: string) => setContents(val)}/>
        </div>
        
        <div className={styles.SectionColumn}>
            <RegisterInput inputTitle="주소" display="none" myPlaceholder="01234" width="8.2rem"/>
            <button className={styles.검색버튼}>우편번호 검색</button>
            <textarea className={styles.input__box} placeholder="주소를 입력해 주세요." style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
            <textarea className={styles.input__box} placeholder="상세주소" style={{ width: "128.0rem", height: "4.8rem" }}></textarea>
        </div>

        <div className={styles.Section}>
            <RegisterInput inputTitle="유튜브 링크" display="none" myPlaceholder="링크를 입력해 주세요." width="128.0rem"/>
        </div>

        <div className={styles.SectionColumnNoLine}>
            <div className={styles.input__title}>사진 첨부</div>
            <div className={styles.pictureUpload}>
                <Picture /><Picture /><Picture />
            </div>
        </div>
        
        <div className={styles.SectionButton}>
            <Button backgroundColor="var(--gray-W)" color="var(--gray-B)" btnTitle="취소" borderColor="var(--gray-B)"/>
            <Button backgroundColor="#2974E5" color="#FFF" btnTitle={isEdit ? "수정하기" : "등록하기"} borderColor="none" onClick={isEdit ? handleUpdate : handleSubmit}
                  disabled={loading || !(writer && title && contents) || (!isEdit && !password)}/>
                  {/* 로딩중에도 버튼 비활성화 */}
        </div>


    </div>
)
  }

export default BoardWrite;
