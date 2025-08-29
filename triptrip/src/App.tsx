import { ChangeEvent, useState } from "react"
import './App.css';

const BoardsNewForm = () => {

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")



  const [writerError, setWriterError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [titleError, setTitleError] = useState("")
  const [contentError, setContentError] = useState("")


  const onClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    // form 기본 동작 막기
    event.preventDefault(); 

    if((writer.length && password.length && title.length && content.length)>0){
      alert("게시글 등록이 가능한 상태입니다!")

      console.log(writer)
      console.log(password)
      console.log(title)
      console.log(content)
    }


    writer===""? setWriterError("필수입력 사항 입니다."):setWriterError("");
    password===""? setPasswordError("필수입력 사항 입니다."):setPasswordError("");
    title===""? setTitleError("필수입력 사항 입니다."):setTitleError("");
    content===""? setContentError("필수입력 사항 입니다."):setContentError("");
    
  }

  return(
    <form>
        <div className="postForm__title">게시물 등록</div>
        <div className="postForm__writer__group">
          <CustomInputText type="text" label="작성자" required placeholder="작성자 명을 입력해 주세요." error={writerError} onChange={(val: string) => setWriter(val)} />
          <CustomInputText type="password" label="비밀번호" required placeholder="비밀번호를 입력해 주세요." error={passwordError} onChange={(val: string) => setPassword(val)} />
        </div>
        <hr />
        <CustomInputText type="text" label="제목" required placeholder="제목을 입력해 주세요." error={titleError} onChange={(val: string) => setTitle(val)} />
        <hr />
        <CustomTextarea label="내용" required placeholder="내용을 입력해 주세요." error={contentError} onChange={(val:string) => setContent(val)} />
        <hr />
        <CustomZipCode />
        <hr />
        <CustomInputText type="text" label="유튜브 링크" placeholder="링크를 입력해 주세요." />
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
          <CustomButton type="submit" label="등록하기" onClick={onClickBtn} />
        </div>
    </form>

  )
}

/* Custom Button 컴포넌트 */
type ButtonType = 'submit' | 'reset' | 'button';
type Btnprops = {
  type: ButtonType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}
export const CustomButton = (props: Btnprops) => {
  return(
    <button type={props.type} disabled={props.disabled && true} onClick={props.onClick}>{props.label}</button>
  )
}

/* Custom Input 컴포넌트 */
type Iprops = {
  label: string,
  type?: string,
  required?: boolean,
  placeholder: string,
  onChange?: (value: string) => void,
  error?: string
}

export const CustomInputText: React.FC<Iprops> = ({label, type, required, placeholder, onChange, error}) => {
  return(
    <div>
      <div><label>{label}</label>{required && <span>*</span>}</div>
      <input type={type} placeholder={placeholder} onChange={(el) => onChange?.(el.target.value)} />
      {error && <span className="errorMessage">{error}</span>}
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
export const CustomTextarea: React.FC<Iprops> = ({label, required, placeholder, onChange, error}) => {
  return(
    <div>
      <div><label>{label}</label>{required && <span>*</span>}</div>
      <textarea placeholder={placeholder} onChange={(el) => onChange?.(el.target.value)}></textarea>
      {error && <span className="errorMessage">{error}</span>}
    </div>
  )
}

/* Custom Add Image 컴포넌트 */
export const CustomAddImage = () => {
  return(
    <div className="add__image">
      <label htmlFor="upload__image">
          <input id="upload__image" type="file" style={{display:"none"}}/>
          <img src="./icons/add.svg" />    
          클릭해서 사진 업로드
      </label>
    </div>
  )
}


export default BoardsNewForm