'use client';
import styles from './styles.module.css';
import useBoardsWriteAdvanced from './hook';
import { BoardVariables } from './types';

export default function BoardsWriteAdvanced(props: BoardVariables) {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onclickUpdate,
    onClickSubmit,
    error,
    checkRegister,
  } = useBoardsWriteAdvanced(props);

  return (
    <div className={styles.layout}>
      <div className={styles['enroll-subject']}>
        <div className={styles['enroll-subject-text']}>게시물 등록</div>
      </div>
      <div className={styles['enroll-row-container']}>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-row-flex']}>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>작성자 </div>
                <div className={styles['enroll-required-indicator']}>*</div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="작성자 명을 입력해 주세요."
                  className={styles['enroll-input']}
                  onChange={onChangeWriter}
                  //   value={writer}
                  defaultValue={props.data?.fetchBoard?.writer || ''}
                  disabled={props.isEdit}
                />
                {error.writer && <p className={styles.error}>{error.writer}</p>}
              </div>
            </div>
            <div className={styles['flex-half']}>
              <div className={styles['enroll-form-title']}>
                <div>비밀번호</div>
                <div className={styles['enroll-required-indicator']}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles['enroll-input']}
                onChange={onChangePassword}
                // defaultValue={'*************'}
                disabled={props.isEdit}
              />
              {error.password && <p className={styles.error}>{error.password}</p>}
            </div>
          </div>
        </div>

        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>제목</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles['enroll-input']}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={props.data?.fetchBoard?.title || ''}
            // value={title}
          />
          {error.title && <p className={styles.error}>{error.title}</p>}
        </div>
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>내용</div>
            <div className={styles['enroll-required-indicator']}> *</div>
          </div>
          <input
            type="text"
            className={styles.contents}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
            defaultValue={props.data?.fetchBoard?.contents || ''}
            // value={content}
          />
          {error.content && <p className={styles.error}>{error.content}</p>}
        </div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>주소</div>
          </div>
          <div className={styles['enroll-address-firstrow']}>
            <input type="number" className={styles['zipcode-input']} placeholder="12345" />
            <button className={styles['zipcode-search-button']}>우편번호 검색</button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles['enroll-input']}
            type="text"
          />
          <input placeholder="상세주소" className={styles['enroll-input']} type="text" />
        </div>
        {/* border */}
        <div className={styles['enroll-border']}></div>
        <div className={styles['enroll-row-section']}>
          <div className={styles['enroll-form-title']}>
            <div>유튜브 링크</div>
          </div>
          <input className={styles['enroll-input']} placeholder="링크를 입력해 주세요." />
        </div>

        {/* border */}
        <div className={styles['enroll-border']}></div>

        <div className={styles['enroll-row-section']}>
          <div>사진 첨부</div>
          <div className={styles['picture-enroll-row']}>
            <img src="/add image.png" />
            <img src="/add image.png" />
            <img src="/add image.png" />
          </div>
        </div>
      </div>
      <div className={styles['enroll-button-container']}>
        <button className={styles['enroll-cancel-button']}>취소</button>
        {/* <Link href={'/boards/detail'}> */}
        <button
          className={styles['enroll-submit-button']}
          onClick={props.isEdit ? onclickUpdate : onClickSubmit}
          disabled={!checkRegister}
          aria-disabled={!checkRegister}
        >
          게시글 {props.isEdit ? '수정' : '등록'}하기
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
