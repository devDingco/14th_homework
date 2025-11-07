"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import useBoardWrite from "./hooks";

const 사진경로 = "/images/add_image.png";
const 아스타기호 = "/images/_.png";

export default function BoardWrite(props) {
  const {
    onClickSubmit,
    onClickUpdate,
    // 비밀번호입력기능,
    // 우편번호상태관리,
    // 주소상태관리,
    // 상세주소입력기능,
    // 유튜브링크입력기능,
    handleClick,
    // address,
    // zonecode,
    // address_detail,
    // url,
    imageUrl,
    imageUrl2,
    imageUrl3,
    onChangeFile,
    fileRef,
    fileRef2,
    fileRef3,
    register,
    handleSubmit,
    formState,
    onClickCancle,
    watch,
    isFormValid,
  } = useBoardWrite();
  // const images = watch("images") || [];
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // const handleClickWrite = async (props) => {
  //   if (props.수정_등록) {
  //     await showModal();
  //     onClickUpdate(data);
  //   } else {
  //     onClickSubmit(data);
  //   }
  // };
  const watchFields = watch(["writer", "title", "password", "contents"]);
  console.log("조회결과", props.data?.fetchBoard);
  console.log("이미지 ====", imageUrl, imageUrl2, imageUrl3);
  return (
    <form
      onSubmit={
        props.수정_등록
          ? handleSubmit(onClickUpdate)
          : handleSubmit(onClickSubmit)
      }
    >
      <div className="w-full min-h-screen flex justify-center">
        <div className=" w-full max-w-3xl p-4">
          <div className={styles.게시물등록영역}>
            <div className={styles.게시물_등록}>게시물 등록</div>
            <div className={styles.작성자_비밀번호_영역}>
              <div>
                <div className={styles.작성자_라벨}>
                  <span>작성자</span>
                  <Image
                    src={아스타기호}
                    alt="아스타기호"
                    width={8}
                    height={8}
                  />
                </div>

                <input
                  id="writer"
                  className={
                    props.수정_등록 ? styles.작성자_비활성 : styles.작성자
                  }
                  type="text"
                  placeholder="작성자 명을 입력해 주세요."
                  {...register("writer")}
                />
                <div style={{ color: "red" }}>
                  {formState.errors.writer?.message}
                </div>
              </div>
              <div>
                <div className={styles.비밀번호_라벨}>
                  <span>비밀번호</span>
                  <Image
                    src={아스타기호}
                    alt="아스타기호"
                    width={8}
                    height={8}
                    sizes="100vw"
                  />
                </div>
                <input
                  id="비밀번호"
                  className={
                    props.수정_등록 ? styles.비밀번호_비활성 : styles.비밀번호
                  }
                  type="password"
                  placeholder={
                    props.수정_등록
                      ? "비밀번호를 수정할 수 없습니다."
                      : "비밀번호를 입력해 주세요."
                  }
                  disabled={props.수정_등록}
                  {...register("password", {
                    required: !props.수정_등록,
                  })}
                />
                <div style={{ color: "red" }}>
                  {formState.errors.password?.message}
                </div>
              </div>
            </div>
            <div className={styles.제목등록영역}>
              <div className={styles.제목_라벨}>
                <span>제목</span>
                <Image
                  src={아스타기호}
                  alt="아스타기호"
                  width={8}
                  height={8}
                  sizes="100vw"
                />
              </div>
              <input
                className={styles.제목인풋}
                id="title"
                type="text"
                placeholder="제목을 입력해 주세요."
                {...register("title")}
              />
              <div style={{ color: "red" }}>
                {formState.errors.title?.message}
              </div>
            </div>
            <div className={styles.내용_주소_등록영역}>
              <div className={styles.내용영역}>
                <div className={styles.내용_라벨}>
                  <span>내용</span>
                  <Image
                    src={아스타기호}
                    alt="아스타기호"
                    width={8}
                    height={8}
                    sizes="100vw"
                  />
                </div>
                <textarea
                  className={styles.내용입력}
                  id="contents"
                  placeholder="내용을 입력해 주세요."
                  {...register("contents")}
                />
                <div style={{ color: "red" }}>
                  {formState.errors.contents?.message}
                </div>
              </div>
              <div className={styles.주소영역}>
                <div>주소</div>
                <div className={styles.우편번호}>
                  <input
                    className={styles.우편번호노출영역}
                    id="우편번호"
                    {...register("zonecode")}
                  />
                  <button
                    type="button"
                    className={styles.우편번호검색버튼}
                    onClick={handleClick}
                  >
                    우편번호검색
                  </button>
                </div>
                <input
                  type="text"
                  {...register("address")}
                  className={styles.주소노출영역}
                  id="주소"
                />
                <input
                  className={styles.상세주소입력영역}
                  type="text"
                  placeholder="상세주소"
                  {...register("address_detail")}
                />
              </div>
            </div>
            <div className={styles.유튜브링크_첨부영역}>
              <div>유튜브 링크</div>
              <input
                className={styles.유투브링크입력}
                type="text"
                placeholder="링크를 입력해 주세요."
                {...register("url")}
              />
            </div>
            <div className={styles.사진첨부영역}>
              <div>사진첨부</div>
              <input
                type="file"
                onChange={(e) => onChangeFile(e, 1)}
                style={{ display: "none" }}
                ref={fileRef}
              />
              <input
                type="file"
                onChange={(e) => onChangeFile(e, 2)}
                style={{ display: "none" }}
                ref={fileRef2}
              />
              <input
                type="file"
                onChange={(e) => onChangeFile(e, 3)}
                style={{ display: "none" }}
                ref={fileRef3}
              />
              <div className={styles.사진첨부버튼}>
                <img
                  src={imageUrl}
                  onClick={() => fileRef.current?.click()}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={imageUrl2}
                  onClick={() => fileRef2.current?.click()}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={imageUrl3}
                  onClick={() => fileRef3.current?.click()}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className={styles.버튼영역}>
              <button
                type="button"
                className={styles.취소버튼}
                onClick={onClickCancle}
              >
                취소
              </button>
              <button
                id="등록버튼ID"
                type="submit"
                className={`${styles.등록버튼} ${
                  isFormValid ? styles.active : ""
                }`}
                disabled={!isFormValid}
              >
                {props.수정_등록 ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
