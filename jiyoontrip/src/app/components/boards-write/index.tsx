"use client";
import useBoardWrite from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardWriteProps } from "./types";
import { CloseCircleFilled } from "@ant-design/icons";
export default function BoardWrite(props: IBoardWriteProps) {
  const { isEdit } = props;
  const {
    onChangeAuthor,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeAddressDetail,
    onClickSignup,
    onClickUpdate,
    onToggleModal,
    onSubmitModal,
    onToggleCompleteModal,
    onCompleteAddress,
    onChangeYoutubeUrl,
    onChangeFile,
    zonecode,
    address,
    imageUrls,
    authorError,
    passwordError,
    titleError,
    contentError,
    isActive,
    data,
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
                onChange={onChangeAuthor}
                defaultValue={data?.fetchBoard.writer ?? ""}
                disabled={isEdit === true ? true : false}
                style={{
                  backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
                }}
              />
              <div className={styles.inputError}>{authorError}</div>
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
                onChange={onChangePassword}
                disabled={isEdit === true ? true : false}
                style={{
                  backgroundColor: isEdit === true ? "#f2f2f2" : "#fff",
                }}
              />
              <div className={styles.inputError}>{passwordError}</div>
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
              onChange={onChangeTitle}
              defaultValue={data?.fetchBoard.title}
            />
            <div className={styles.inputError}>{titleError}</div>
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
              onChange={onChangeContent}
              defaultValue={data?.fetchBoard.contents}
            />
            <div className={styles.inputError}>{contentError}</div>
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
                  value={zonecode || data?.fetchBoard.boardAddress?.zipcode || ""}
                />
                <button className={styles.inputArea__button} onClick={onToggleModal}>
                  우편번호 검색
                </button>
              </div>
            </div>
            <input
              className={styles.inputArea__input}
              type="text"
              placeholder="주소를 입력해 주세요"
              value={address || data?.fetchBoard.boardAddress?.address || ""}
            />
            <input
              className={styles.inputArea__input}
              type="text"
              placeholder="상세주소"
              onChange={onChangeAddressDetail}
              defaultValue={data?.fetchBoard.boardAddress?.addressDetail ?? ""}
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
              onChange={onChangeYoutubeUrl}
              defaultValue={data?.fetchBoard?.youtubeUrl ?? ""}
              // defaultValue={props.data?.fetchBoard.youtubeUrl}
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
                  {imageUrls[0] ? (
                    <div>
                      <img
                        className={styles.uploadImage}
                        src={`https://storage.googleapis.com/${imageUrls[0]}`}
                      />
                      <CloseCircleFilled />
                    </div>
                  ) : (
                    data?.fetchBoard?.images?.[0] && ( // 없으면 DB 값 보여줌
                      <img
                        className={styles.uploadImage}
                        src={`https://storage.googleapis.com/${data.fetchBoard.images[0]}`}
                      />
                    )
                  )}
                  <div className={styles.plusIcon}>
                    <Image
                      src="/icons/outline/add.svg"
                      alt="AddIcon"
                      width={24}
                      height={24}
                    />
                    <p>클릭해서 사진 업로드</p>
                  </div>
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
                  {imageUrls[1] ? (
                    <img
                      className={styles.uploadImage}
                      src={`https://storage.googleapis.com/${imageUrls[1]}`}
                    />
                  ) : (
                    data?.fetchBoard?.images?.[1] && (
                      <img
                        className={styles.uploadImage}
                        src={`https://storage.googleapis.com/${data.fetchBoard.images[1]}`}
                      />
                    )
                  )}
                  <div className={styles.plusIcon}>
                    <Image
                      src="/icons/outline/add.svg"
                      alt="AddIcon"
                      width={24}
                      height={24}
                    />
                    <p>클릭해서 사진 업로드</p>
                  </div>
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
                  {imageUrls[2] ? (
                    <img
                      className={styles.uploadImage}
                      src={`https://storage.googleapis.com/${imageUrls[2]}`}
                    />
                  ) : (
                    data?.fetchBoard?.images?.[2] && (
                      <img
                        className={styles.uploadImage}
                        src={`https://storage.googleapis.com/${data.fetchBoard.images[2]}`}
                      />
                    )
                  )}
                  <div className={styles.plusIcon}>
                    <Image
                      src="/icons/outline/add.svg"
                      alt="AddIcon"
                      width={24}
                      height={24}
                    />
                    <p>클릭해서 사진 업로드</p>
                  </div>
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
            <button className={styles.inputArea__cancelButton}>취소</button>
            <button
              className={styles.inputArea__registerButton}
              onClick={isEdit === false ? onClickSignup : onClickUpdate}
              style={{
                backgroundColor:
                  isEdit === true
                    ? "#2974E5" // 수정 페이지에서는 무조건 파란색
                    : isActive === true
                    ? "#2974E5" // 등록 페이지에서 활성화 시 파란색
                    : "#C7C7C7",
              }}
            >
              {isEdit === true ? "수정" : "등록"}하기
            </button>
          </div>
        </div>
      </div>
      {isModalOpen === true && (
        <Modal
          title="우편번호 검색"
          closable={{ "aria-label": "Custom Close Button" }}
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
          closable={{ "aria-label": "Custom Close Button" }}
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
