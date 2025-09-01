import { CustomButton, UploadImagesWithLabel } from 'components'
import useForm from 'hooks/useForm'
import validate from 'utils/validate'
import './BoardsNew.css'
import { initialPostValue } from '../board.shared'

const BoardsNew = () => {
  const {
    values: post,
    errors,
    isActive,
    handleChange,
    handleSubmit,
  } = useForm({ initialValues: initialPostValue, validate })

  return (
    <div className="container">
      <div id="post">
        <header>
          <h1 className="header-title">게시물 등록</h1>
        </header>

        <form className="post-form" onSubmit={handleSubmit}>
          <div className="post-form-col">
            {/* 작성자 */}
            <div className="post-form-input">
              <div>
                <label>작성자</label>
                <span>*</span>
              </div>

              <input
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                name="writer"
                onChange={handleChange}
                value={post.writer}
              />
              <span className="error-message">{errors.writer && errors.writer}</span>
            </div>

            {/* 비밀번호 */}
            <div className="post-form-input">
              <div>
                <label>비밀번호</label>
                <span>*</span>
              </div>

              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                name="password"
                onChange={handleChange}
                value={post.password}
              />
              <span className="error-message">{errors.password && errors.password}</span>
            </div>
          </div>
          <hr />
          {/* 제목 */}
          <div className="post-form-input">
            <div>
              <label>제목</label>
              <span>*</span>
            </div>

            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              name="title"
              onChange={handleChange}
              value={post.title}
            />
            <span className="error-message">{errors.title && errors.title}</span>
          </div>

          <hr />
          {/* 내용 */}
          <div className="post-form-input">
            <div>
              <label>내용</label>
              <span>*</span>
            </div>

            <textarea
              placeholder="내용을 입력해 주세요."
              name="contents"
              onChange={handleChange}
              value={post.contents}
            />
            <span className="error-message">{errors.contents && errors.contents}</span>
          </div>

          {/* 주소 */}
          <div className="post-form-addr">
            <div>
              <label>'주소'</label>
            </div>
            <div className="post-form-addr-active">
              <input className="post-form-addr-zipcode" placeholder="01234" />
              <CustomButton type={'button'} content={'우편번호 검색'} color={'default'} />
            </div>
            <input placeholder="주소를 입력해 주세요." />
            <input placeholder="상세주소" />
          </div>
          <hr />
          {/* 유튜브 링크 */}
          <div className="post-form-input">
            <div>
              <label>유튜브 링크</label>
            </div>

            <input
              type="text"
              placeholder="링크를 입력해 주세요."
              name="link"
              onChange={handleChange}
              value={post.link}
            />
            {/* <span className="error-message">{errors.link && errors.link}</span> */}
          </div>
          <hr />

          <UploadImagesWithLabel />
          <div className="post-actions">
            <CustomButton type={'button'} content={'취소'} color={'default'} />
            <CustomButton
              type={'submit'}
              content={'등록하기'}
              color={'blue'}
              disabled={!isActive}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BoardsNew
