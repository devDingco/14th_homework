const NewPost = () => {

    const handleSearchAddress = () => {}
    
    const handleUploadImage = () => {}

    const handleCancel = () => {}

    const handleRegister = () => {}
    return (
        <div className="page">
            <div className="container">
                <div className="header">게시물 등록</div>

                <div className = "userinfo_area">
                    <div className="input_area">
                        <div className="input_label">
                            <div className="input_label_title">작성자</div>
                            <div className="input_label_star">*</div>
                        </div>
                        <input
                            className="input_text"
                            type="text"
                            placeholder="작성자 명을 입력해 주세요."
                        />
                    </div>
                    <div className="input_area">
                        <div className="input_label">
                            <div className="input_label_title">비밀번호</div>
                            <div className="input_label_star">*</div>
                        </div>
                        <input
                            className="input_text"
                            type="text"
                            placeholder="비밀번호를 입력해 주세요."
                        />
                    </div>
                </div>

                <hr className="divider"/>

                <div className="input_area">
                    <div className="input_label">
                        <div className="input_label_title">내용</div>
                        <div className="input_label_star">*</div>
                    </div>
                    <textarea
                        className="input_text"
                        rows="10"
                        placeholder="내용을 입력해 주세요."
                    ></textarea>
                </div>

                <hr className="divider"/>

                <div className="address_area">
                    <div className="input_label">
                        <div className="input_label_title">주소</div>               
                    </div>
                    <div className="address_search">
                        <input 
                            className="input_address_number"
                            type="text"
                            placeholder="01234"
                        />
                        <button className="search_button" onClick={handleSearchAddress}>우편번호 검색</button>                    
                    </div>    
                    <input
                        className="input_text"
                        type="text"
                        placeholder="주소를 입력해 주세요."
                    />
                    <input
                        className="input_text"
                        type="text"
                        placeholder="상세주소"
                    />
                </div>        

                <hr className="divider"/>

                <div className="input_area">
                    <div className="input_label">
                        <div className="input_label_title">유튜브 링크</div>
                    </div>
                    <input
                        className="input_text"
                        type="text"
                        placeholder="링크를 입력해 주세요."
                    />
                </div>

                <hr className="divider"/>

                <div className="input_area">
                    <div className="input_label">
                        <div className="input_label_title">사진 첨부</div>                    
                    </div>
                    <div className="image_add_button_area">
                        <div className="image_add_button" onClick={handleUploadImage}>
                            <img className="icon_image" src="./assets/add.png"></img>
                            <div className="image_add_button_text">클릭해서 사진 업로드</div>
                        </div>
                        <div className="image_add_button" onClick={handleUploadImage}>
                            <img className="icon_image" src="./assets/add.png"></img>
                            <div className="image_add_button_text">클릭해서 사진 업로드</div>
                        </div>
                        <div className="image_add_button" onClick={handleUploadImage}>
                            <img className="icon_image" src="./assets/add.png"></img>
                            <div className="image_add_button_text">클릭해서 사진 업로드</div>
                        </div>
                    </div>
                </div>

                <div className="button_area">
                    <button className="cancel_button" onClick={handleCancel}>취소</button>
                    <button className="register_button" onClick={handleRegister}>등록하기</button>
                </div>
            </div>

        </div>
    )

}