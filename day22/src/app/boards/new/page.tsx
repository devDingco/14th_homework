"use client";
import React, {ChangeEvent, useState } from "react";
import styles from "./styles.module.css"; // 레퍼런스의 CSS Modules를 사용합니다.
import Image from "next/image"; // Next.js의 Image 컴포넌트를 사용합니다.
import addImage from ""
// 1. 이미지 경로를 관리하는 부분은 레퍼런스 코드를 따릅니다.


const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      heart
      brokenheart
      
      }
  }
`;

export default function BoardsDetailPage() {
  const { boardId } = useParams();


export default function BoardsNewPage() {
  // 3. 소정님의 효율적인 '객체' 상태 관리 방식을 그대로 사용합니다.
  const [inputs, setInputs] = useState<IInputs>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });
  const [errors, setErrors] = useState<IErrors>({});

  // 4. 모든 입력창을 처리하는 똑똑한 함수도 그대로 가져옵니다.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 5. 등록 버튼 클릭 시 유효성을 검사하는 함수입니다.
  // const handleSubmit = () => {
  //   const newErrors: IErrors = {};
  //   if (!inputs.writer.trim()) newErrors.writer = "필수입력 사항입니다.";
  //   if (!inputs.password.trim()) newErrors.password = "필수입력 사항입니다.";
  //   if (!inputs.title.trim()) newErrors.title = "필수입력 사항입니다.";
  //   if (!inputs.contents.trim()) newErrors.contents = "필수입력 사항입니다.";

  //   setErrors(newErrors);

  const handleSubmit = () => {
    // 1. '에러가 있는가?'를 기억할 깃발을 하나 준비합니다.
    let hasError = false;

    // 2. 각 입력창을 하나씩 순서대로 검사합니다.
    // 작성자 검사
    if (inputs.writer.trim() === "") {
      setErrors((prev) => ({ ...prev, writer: "필수입력 사항입니다." }));
      hasError = true; // 에러를 발견했으니 깃발을 올립니다!
    } else {
      setErrors((prev) => ({ ...prev, writer: "" })); // 통과했다면 에러 메시지를 지웁니다.
    }

    // 비밀번호 검사
    if (inputs.password === "") {
      setErrors((prev) => ({ ...prev, password: "필수입력 사항입니다." }));
      hasError = true; // 에러 발견!
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    // 제목 검사
    if (inputs.title.trim() === "") {
      setErrors((prev) => ({ ...prev, title: "필수입력 사항입니다." }));
      hasError = true; // 에러 발견!
    } else {
      setErrors((prev) => ({ ...prev, title: "" }));
    }

    // 내용 검사
    if (inputs.contents.trim() === "") {
      setErrors((prev) => ({ ...prev, contents: "필수입력 사항입니다." }));
      hasError = true; // 에러 발견!
    } else {
      setErrors((prev) => ({ ...prev, contents: "" }));
    }

    // 3. 모든 검사가 끝난 후, 깃발을 최종 확인합니다.
    // hasError 깃발이 한 번도 올라가지 않았다면(여전히 false라면), 모든 검사를 통과한 것입니다.
    if (!hasError) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

    if (Object.keys(newErrors).length === 0) {
      alert("게시글 등록이 가능한 상태입니다!");
      console.log("제출할 데이터:", inputs);
      // Day 21에서는 이 부분에 서버로 데이터를 전송하는 코드가 추가됩니다.
    }
  };

  // 버튼 활성화 여부를 결정하는 변수
  const isButtonDisabled = !inputs.writer || !inputs.password || !inputs.title || !inputs.contents;

  // 6. 화면(JSX)은 레퍼런스 코드의 구조와 className을 사용합니다.
  return (
    <div className={styles.layout}>
      <div className={styles["enroll-subject"]}>
        <div className={styles["enroll-subject-text"]}>게시물 등록</div>
      </div>
      <div className={styles["enroll-row-container"]}>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-row-flex"]}>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>작성자 </div>
                <div className={styles["enroll-required-indicator"]}>*</div>
              </div>
              <input
                type="text"
                name="writer" // name 속성으로 어떤 입력창인지 구분합니다.
                placeholder="작성자 명을 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={handleInputChange}
                value={inputs.writer}
              />
              <div className={styles["error-msg"]}>{errors.writer}</div>
            </div>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>비밀번호</div>
                <div className={styles["enroll-required-indicator"]}>*</div>
              </div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={handleInputChange}
                value={inputs.password}
              />
              <div className={styles["error-msg"]}>{errors.password}</div>
            </div>
          </div>
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>제목</div>
            <div className={styles["enroll-required-indicator"]}>*</div>
          </div>
          <input
            type="text"
            name="title"
            className={styles["enroll-input"]}
            placeholder="제목을 입력해 주세요."
            onChange={handleInputChange}
            value={inputs.title}
          />
          <div className={styles["error-msg"]}>{errors.title}</div>
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>내용</div>
            <div className={styles["enroll-required-indicator"]}>*</div>
          </div>
          <textarea
            name="contents"
            placeholder="내용을 입력해 주세요."
            className={`${styles["enroll-input"]} ${styles["enroll-textarea"]}`}
            onChange={handleInputChange}
            value={inputs.contents}
          ></textarea>
          <div className={styles["error-msg"]}>{errors.contents}</div>
        </div>
        {/* 주소, 유튜브, 사진 첨부 등 나머지 부분은 레퍼런스 코드와 동일하게 유지 */}
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>주소</div>
          </div>
          <div className={styles["enroll-address-firstrow"]}>
            <input
              type="number"
              className={styles["zipcode-input"]}
              placeholder="12345"
            />
            <button className={styles["zipcode-search-button"]}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles["enroll-input"]}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles["enroll-input"]}
            type="text"
          />
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles["enroll-input"]}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles["enroll-border"]}></div>

        <div className={styles["enroll-row-section"]}>
          <div>사진 첨부</div>
          <div className={styles["picture-enroll-row"]}>
            <Image src={IMAGE_SRC.addImage.src} alt={IMAGE_SRC.addImage.alt} />
            <Image src={IMAGE_SRC.addImage.src} alt={IMAGE_SRC.addImage.alt} />
            <Image src={IMAGE_SRC.addImage.src} alt={IMAGE_SRC.addImage.alt} />
          </div>
        </div>
      </div>
      <div className={styles["enroll-button-container"]}>
        <button className={styles["enroll-cancel-button"]}>취소</button>
        <button
          className={
            isButtonDisabled
              ? `${styles["enroll-submit-button"]} ${styles["disabled"]}`
              : styles["enroll-submit-button"]
          }
          onClick={handleSubmit} // 함수 이름 변경
          disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}