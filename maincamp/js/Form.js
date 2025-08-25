/* Form에서 쓰는 Button 형식 컴포넌트 */
const FormBtn = (props) => {
    return(
        <button type={props.type} disabled={props.disabled}>{props.text}</button>
    )
}

/* Form에서 쓰는 Input 형식 컴포넌트 */
const FormInput = (props) => {
    if(props.type === "textarea"){
        return(        
        <div>
            <div><label>{props.label}</label>{props.required == "true" ? <span>*</span> : ""}</div>
            <textarea placeholder={InputPlaceholder[props.placeholder__name]}></textarea>
        </div>)
    }
    else if(props.type === "address"){
        return(        
            <div className="postForm__address__group">
                <div>
                    <label>주소</label>
                    <div className="zipCode__group">
                        <input type="text" placeholder={[InputPlaceholder['zipCode']]} />
                        <FormBtn type="button" text="우편번호 검색" />
                    </div>
                </div>
                <input type="text" placeholder={InputPlaceholder['mainAddress']}/>
                <input type="text" placeholder={InputPlaceholder['detailAddress']}/>
            </div>
        )
    }
    else if(props.type === "imagefile"){
        return(
            <div className="add__image">
                <label for="upload__image">
                    <input id="upload__image" type="file" style={{display:"none"}}/>
                    <img src="./assets/icons/add.svg" />    
                    클릭해서 사진 업로드
                </label>
            </div>
        )
    }
    else{
        return(
            <div>
                <div><label>{props.label}</label>{props.required == "true" ? <span>*</span> : ""}</div>
                <input type={props.input} placeholder={InputPlaceholder[props.placeholder__name]} />
            </div>
        )
    }
}

/* Form-Input-Placeholder */
const InputPlaceholder = {
    postWriter: "작성자 명을 입력해 주세요.",
    postPassword: "비밀번호를 입력해 주세요.",
    postTitle: "제목을 입력해 주세요.",
    postContent: "내용을 입력해 주세요.",
    zipCode: "01234",
    mainAddress: "주소를 입력해 주세요.",
    detailAddress: "상세주소",
    youtubeUrl: "링크를 입력해 주세요." 
}

/* PostForm: 게시글 등록 폼 */
const PostForm = () => {

    return(
        <form>
            <div className="postForm__title">게시물 등록</div>
            <div className="postForm__writer__group">
                <FormInput label="작성자" type="text" required="true" placeholder__name="postWriter" />
                <FormInput label="비밀번호" type="password" required="true" placeholder__name="postPassword" />
            </div> 
            <hr />
            <FormInput label="제목" type="text" required="true" placeholder__name="postTitle" />
            <hr />
            <FormInput label="내용" type="textarea" required="true" placeholder__name="postContent" />
            <hr />
            <FormInput type="address" />
            <hr />
            <FormInput type="text" required="false" label="유튜브 링크" placeholder__name="youtubeUrl" />
            <hr />
            <div className="postForm__attachments__group">
                <label>사진 첨부</label>
                <div className="image__upload__group">
                    <FormInput type="imagefile" />
                    <FormInput type="imagefile" />
                    <FormInput type="imagefile" />
                </div>
            </div>
            <div className="postForm__button__group">
                <FormBtn type="button" text="취소" />
                <FormBtn type="submit" text="등록하기" disabled="true"/>
            </div>
        </form>
    )
}