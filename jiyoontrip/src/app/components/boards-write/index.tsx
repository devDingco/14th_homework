"use client";
import useBoardWrite from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardWriteProps } from "./types";
import { CloseCircleFilled } from "@ant-design/icons";
export default function BoardWrite(props: IBoardWriteProps) {
  const { isEdit } = props;
  const {
    register,
    handleSubmit,
    images,
    formState,
    onClickSignup,
    onClickUpdate,
    onClickDeleteImage,
    onToggleModal,
    onSubmitModal,
    onToggleCompleteModal,
    onCompleteAddress,
    onChangeFile,
    DaumPostcodeEmbed,
    Modal,
    isModalOpen,
    isCompleteModalOpen,
  } = useBoardWrite();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.postHeader}>게시물 등록</header>
          <form onSubmit={handleSubmit(isEdit ? onClickUpdate : onClickSignup)}>
            <div className={styles.enrollAuthorPassword}>
              <div className={styles.inputArea}>
                <div className={styles.inputArea__enrollLabel}>
                  <label
                    htmlFor="author-input-1"
                    className={styles.inputArea__enrollLabel__label}
                  >
                    작성자
                  </label>
                  <span className={styles.inputArea__enrollLabel__star}>*</span>
                </div>
                <input
                  id="author-input-1"
                  className={styles.inputArea__input}
                  type="text"
                  placeholder="작성자 명을 입력해 주세요."
                  {...register("writer")}
                  disabled={isEdit === true ? true : false}
                  style={{
                    backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
                  }}
                />
                <div className={styles.inputError}>
                  {formState.errors.writer?.message}
                </div>
              </div>
              <div className={styles.inputArea}>
                <div className={styles.inputArea__enrollLabel}>
                  <label
                    htmlFor="author-input-2"
                    className={styles.inputArea__enrollLabel__label}
                  >
                    비밀번호
                  </label>
                  <span className={styles.inputArea__enrollLabel__star}>*</span>
                </div>
                <input
                  id="author-input-2"
                  className={styles.inputArea__input}
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  defaultValue={isEdit === true ? "********" : ""}
                  {...register("password")}
                  disabled={isEdit === true ? true : false}
                  style={{
                    backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
                  }}
                />
                <div className={styles.inputError}>
                  {formState.errors.password?.message}
                </div>
              </div>
            </div>
            <hr className={styles.line} />
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-3"
                  className={styles.inputArea__enrollLabel__label}
                >
                  제목
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <input
                id="author-input-3"
                className={styles.inputArea__input}
                type="text"
                placeholder="제목을 입력해 주세요."
                {...register("title")}
              />
              <div className={styles.inputError}>
                {
                  formState.errors.title?.message // defaultValue={data?.fetchBoard.writer ?? ""}
                }
              </div>
            </div>
            <hr className={styles.line} />
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-4"
                  className={styles.inputArea__enrollLabel__label}
                >
                  내용
                </label>
                <span className={styles.inputArea__enrollLabel__star}>*</span>
              </div>
              <textarea
                id="author-input-4"
                className={styles.inputArea__textarea}
                placeholder="내용을 입력해 주세요."
                {...register("contents")}
              />
              <div className={styles.inputError}>
                {formState.errors.contents?.message}
              </div>
            </div>
            <div className={styles.addressArea}>
              <div className={styles.addressArea__search}>
                <label
                  htmlFor="author-input-5"
                  className={styles.inputArea__enrollLabel__label}
                >
                  주소
                </label>
                <div className={styles.addressArea__enrollInputButton}>
                  <input
                    id="author-input-5"
                    className={styles.inputArea__addressInput}
                    type="text"
                    placeholder="01234"
                    {...register("boardAddress.zipcode")}
                  />
                  <button
                    className={styles.inputArea__button}
                    type="button"
                    onClick={onToggleModal}
                  >
                    우편번호 검색
                  </button>
                </div>
              </div>
              <input
                className={styles.inputArea__input}
                type="text"
                placeholder="주소를 입력해 주세요"
                {...register("boardAddress.address")}
              />
              <input
                className={styles.inputArea__input}
                type="text"
                placeholder="상세주소"
                {...register("boardAddress.addressDetail")}
              />
            </div>
            <hr className={styles.line} />
            <div className={styles.inputArea}>
              <div className={styles.inputArea__enrollLabel}>
                <label
                  htmlFor="author-input-6"
                  className={styles.inputArea__enrollLabel__label}
                >
                  유튜브 링크
                </label>
              </div>
              <input
                id="author-input-6"
                className={styles.inputArea__input}
                type="text"
                placeholder="링크를 입력해 주세요."
                {...register("youtubeUrl")}
              />
              <div className={styles.inputError}></div>
            </div>
            <hr className={styles.line} />
            {/* ImageUpload: 사진 첨부 */}
            <div className={styles.imageUploadArea}>
              <label className={styles.inputArea__enrollLabel__label}>사진 첨부</label>
              <div className={styles.imageUploadInput}>
                <label htmlFor="file-upload-1">
                  <div className={styles.imageUploadInput__drop}>
                    {images?.[0] ? (
                      <div>
                        <img
                          className={styles.uploadImage}
                          src={`https://storage.googleapis.com/${images?.[0]}`}
                        />
                        <CloseCircleFilled
                          className={styles.deleteBtn}
                          onClick={onClickDeleteImage(0)}
                        />
                      </div>
                    ) : (
                      <div className={styles.plusIcon}>
                        <Image
                          src="/icons/outline/add.svg"
                          alt="AddIcon"
                          width={24}
                          height={24}
                        />
                        <p>클릭해서 사진 업로드</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file-upload-1"
                      onChange={onChangeFile(0)}
                      accept="image/jpeg, image/png"
                    />
                  </div>
                </label>
                <label htmlFor="file-upload-2">
                  <div className={styles.imageUploadInput__drop}>
                    {images?.[1] ? (
                      <div>
                        <img
                          className={styles.uploadImage}
                          src={`https://storage.googleapis.com/${images?.[1]}`}
                        />
                        <CloseCircleFilled
                          className={styles.deleteBtn}
                          onClick={onClickDeleteImage(1)}
                        />
                      </div>
                    ) : (
                      <div className={styles.plusIcon}>
                        <Image
                          src="/icons/outline/add.svg"
                          alt="AddIcon"
                          width={24}
                          height={24}
                        />
                        <p>클릭해서 사진 업로드</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file-upload-2"
                      onChange={onChangeFile(1)}
                      accept="image/jpeg, image/png"
                    />
                  </div>
                </label>
                <label htmlFor="file-upload-3">
                  <div className={styles.imageUploadInput__drop}>
                    {images?.[2] ? (
                      <div>
                        <img
                          className={styles.uploadImage}
                          src={`https://storage.googleapis.com/${images?.[2]}`}
                        />
                        <CloseCircleFilled
                          className={styles.deleteBtn}
                          onClick={onClickDeleteImage(2)}
                        />
                      </div>
                    ) : (
                      <div className={styles.plusIcon}>
                        <Image
                          src="/icons/outline/add.svg"
                          alt="AddIcon"
                          width={24}
                          height={24}
                        />
                        <p>클릭해서 사진 업로드</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file-upload-3"
                      onChange={onChangeFile(2)}
                      accept="image/jpeg, image/png"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.enrollButton}>
              <button type="button" className={styles.inputArea__cancelButton}>
                취소
              </button>
              <button
                className={styles.inputArea__registerButton}
                type="submit"
                style={{
                  backgroundColor: isEdit ? "#2974E5" : "#C7C7C7",
                }}
              >
                {isEdit ? "수정" : "등록"}하기
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen === true && (
        <Modal
          title="우편번호 검색"
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          <DaumPostcodeEmbed onComplete={onCompleteAddress} />
        </Modal>
      )}
      {isCompleteModalOpen === true && (
        <Modal
          title={isEdit === true ? "수정완료" : "작성완료"}
          open={true}
          onOk={onSubmitModal}
          onCancel={onToggleCompleteModal}
        >
          {isEdit === true
            ? "게시글이 성공정으로 수정되었습니다."
            : "게시글이 성공적으로 등록되었습니다."}
        </Modal>
      )}
    </>
  );
}
