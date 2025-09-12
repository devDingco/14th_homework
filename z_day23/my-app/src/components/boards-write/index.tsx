"use client";

import styles from "./styles.module.css";
import { SmallInput, LongInput, SuperLongInput } from "./form-input";
import Divider from "./line";
import { useRouter } from "next/navigation";
import { IBoardsNewProps } from "./types";
import { useBoardsForm } from "./hook";

export default function BoardsNew(props: IBoardsNewProps) {
  const router = useRouter();

  // Use the custom hook to get states and handler functions
  const {
    writerInput,
    passwordInput,
    titleInput,
    contentInput,
    writerError,
    passwordError,
    titleError,
    contentError,
    isFormValid,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSubmit,
    onClickUpdate,
  } = useBoardsForm();

  return (
    <div className={styles.App}>
      <header>
        <div className={styles.전체}>
          <div className={styles.헤더}></div>
          <div className={styles.바디}>
            <div className={styles.게시글_폼_제목}>
              {props.isEdit ? "게시글 수정" : "게시글 등록"}
            </div>
            <div className={styles.게시글_폼}>
              <div className={styles.게시글_폼_상세}>
                {/* 작성자 & 비밀번호 */}
                <div className={styles.게시글_인풋블록}>
                  <SmallInput
                    Input_Title="작성자"
                    Input_Placeholder="작성자 명을 입력해주세요."
                    Input_Star="*"
                    defaultValue={props.data?.fetchBoard?.writer ?? ""}
                    onChange={onChangeWriter}
                    errorMessage={writerError}
                    disabled={props.isEdit}
                  />
                  <SmallInput
                    Input_Title="비밀번호"
                    Input_Placeholder="비밀번호를 입력해주세요."
                    Input_Star="*"
                    defaultValue={passwordInput}
                    onChange={onChangePassword}
                    errorMessage={passwordError}
                    disabled={props.isEdit}
                  />
                </div>
                <Divider />

                {/* 제목 */}
                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="제목"
                    Input_Placeholder="제목을 입력해 주세요."
                    Input_Star="*"
                    defaultValue={props.data?.fetchBoard?.title ?? ""}
                    onChange={onChangeTitle}
                    errorMessage={titleError}
                  />
                </div>
                <Divider />

                {/* 내용 */}
                <div className={styles.게시글_인풋블록}>
                  <SuperLongInput
                    Input_Title="내용"
                    Input_Placeholder="내용을 입력해 주세요."
                    Input_Star="*"
                    defaultValue={props.data?.fetchBoard?.contents ?? ""}
                    onChange={onChangeContent}
                    errorMessage={contentError}
                  />
                </div>

                {/* 주소 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <div className={styles.주소인풋이랑버튼}>
                    주소
                    <div className={styles.인풋이랑버튼}>
                      <input
                        className={styles.우편번호인풋}
                        placeholder="01234"
                      />
                      <button className={styles.우편번호검색}>
                        우편번호 검색
                      </button>
                    </div>
                  </div>
                  <LongInput Input_Placeholder="주소를 입력해 주세요." />
                  <LongInput Input_Placeholder="상세주소" />
                </div>
                <Divider />

                {/* 유튜브 */}
                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="유튜브링크"
                    Input_Placeholder="링크를 입력해주세요."
                  />
                </div>
                <Divider />

                {/* 사진 첨부 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <span>사진첨부</span>
                  <div className={styles.사진첨부_그룹}>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className={styles.게시글_폼_버튼}>
                <button
                  className="취소"
                  onClick={() => {
                    router.push(`/boards/`);
                  }}
                >
                  취소
                </button>
                <button
                  style={{
                    backgroundColor: isFormValid ? "#2974E5" : "gray",
                  }}
                  className={styles.등록}
                  onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                >
                  {props.isEdit ? "수정" : "등록"}하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
