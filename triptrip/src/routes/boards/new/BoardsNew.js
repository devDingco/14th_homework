import { useState } from "react"
import './BoardsNew.css';
import { Link } from "react-router";

const BoardsNewForm = () => {

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")


  const [isValid, setIsValid] = useState(true)

  const onChangeWriter = (event) => {
    setWriter(event.target.value)

    if(event.target.value && password && title && content){
      setIsValid(false)
    } else{
      setIsValid(true)
    }
  }
  const onChangePassword = (event) => {
    setPassword(event.target.value)

    if(writer && event.target.value && title && content){
      setIsValid(false)
    } else{
      setIsValid(true)
    }
  }
  const onChangeTitle = (event) => {
    setTitle(event.target.value)

    if(writer && password && event.target.value && content){
      setIsValid(false)
    } else{
      setIsValid(true)
    }
  }
  const onChangeContent = (event) => {
    setContent(event.target.value)

    if(writer && password && title && event.target.value){
      setIsValid(false)
    } else{
      setIsValid(true)
    }
  }



  const onClickBtn = (event) => {

    alert("게시물 등록이 완료되었습니다.")

  }

  return(
    <form>
        <div className="postForm__title">게시물 등록</div>
        <div className="postForm__writer__group">
          <CustomInputText type="text" label="작성자" required placeholder="작성자 명을 입력해 주세요." onChange={onChangeWriter} />
          <CustomInputText type="password" label="비밀번호" required placeholder="비밀번호를 입력해 주세요." onChange={onChangePassword} />
        </div>
        <hr />
        <CustomInputText type="text" label="제목" required placeholder="제목을 입력해 주세요." onChange={onChangeTitle} />
        <hr />
        <CustomTextarea label="내용" required placeholder="내용을 입력해 주세요." onChange={onChangeContent} />
        <hr />
        <CustomZipCode />
        <hr />
        <CustomInputText type="text" label="유튜브 링크" placeholder="링크를 입력해 주세요."/>
        <hr />
        <div className="postForm__attachments__group">
          <label>사진 첨부</label>
          <div className="image__upload__group">
            <CustomAddImage />
            <CustomAddImage />
            <CustomAddImage />
          </div>
        </div>
        <div className="postForm__button__group">
          <CustomButton type="button" label="취소" />
          <Link to='/boards/detail'>
            <CustomButton type="submit" disabled={isValid} label="등록하기" onClick={onClickBtn} />
          </Link>
        </div>
    </form>

  )
}

/* Custom Button 컴포넌트 */
export const CustomButton = (props) => {

  const iconPath = `/icons/${props.icon}.svg`

  return(
    <button type={props.type} disabled={props.disabled && true} onClick={props.onClick}>{props.icon && <img src={iconPath} />}{props.label}</button>
  )
}

/* Custom Input 컴포넌트 */

export const CustomInputText = (props) => {
  return(
    <div>
      <div><label>{props.label}</label>{props.required && <span>*</span>}</div>
      <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  )
}

/* Custom Zipcode 컴포넌트 */
export const CustomZipCode = () => {
  return(
    <div className="postForm__address__group">
      <div>
          <label>주소</label>
          <div className="zipCode__group">
              <input type="text" placeholder="01234" />
              <CustomButton type="button" label="우편번호 검색" />
          </div>
      </div>
      <input type="text" placeholder="주소를 입력해 주세요." />
      <input type="text" placeholder="상세주소" />
    </div>
  )
}

/* Custom Textarea 컴포넌트 */
export const CustomTextarea = (props) => {
  return(
    <div>
      <div><label>{props.label}</label>{props.required && <span>*</span>}</div>
      <textarea placeholder={props.placeholder} onChange={props.onChange}></textarea>
    </div>
  )
}

/* Custom Add Image 컴포넌트 */
export const CustomAddImage = () => {
  return(
    <div className="add__image">
      <label htmlFor="upload__image">
          <input id="upload__image" type="file" style={{display:"none"}}/>
          <img src="/icons/add.svg" />
          클릭해서 사진 업로드
      </label>
    </div>
  )
}


export default BoardsNewForm