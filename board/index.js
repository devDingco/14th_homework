
const 게시글등록페이지 = () => {

    return (
        <>
            <div id="head">게시물 등록</div>
            <div id="main">
                <div class="메인">
                    <div class="메인__1__1">
                        <div>작성자 <span class="필수">*</span> </div>
                        <input type="text" placeholder="작성자 명을 입력해 주세요." class="메인1__인풋"></input>
                    </div>
                    <div class="메인__1__1">
                        <div>비밀번호 <span class="필수">*</span></div>
                        <input type="password" placeholder="비밀번호를 입력해 주세요." class="메인1__인풋"></input>
                    </div>
                </div>
                <hr></hr>
                <div id="메인__제목" class="메인__1__1">
                    <div>제목 <span class="필수">*</span></div>
                    <input type="text" placeholder="제목을 입력해 주세요."></input>
                </div>
                <hr></hr>

                <div id="메인__내용" class="메인__1__1">
                    <div>내용 <span class="필수">*</span></div>
                    <textarea placeholder="내용을 입력해 주세요."></textarea>
                </div>
          

                <div id="메인__주소" class="메인__1__1">
                    <div class="메인__1__1" id="메인__주소__검색">
                        <div>주소</div>
                        <div id="메인__주소__주소검색">
                            <input type="number" placeholder="01234" id="주소검색인풋"></input>
                            <button id="주소검색버튼">우편번호 검색</button>
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="주소를 입력해 주세요."></input>
                    </div>
                    <div>
                        <input type="text" placeholder="상세주소"></input>
                    </div>
                </div>
                <hr></hr>

                <div id="메인__유튜브링크" class="메인__1__1">
                    <div>유튜브 링크</div>
                    <input type="text" placeholder="링크를 입력해주세요."></input>
                </div>
                <hr></hr>

                <div class="메인__1__1">  
                    <div>사진 첨부</div>
                    <div id="사진첨부목록">
                        <div class="사진첨부리스트">
                            <img src="./assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                        <div class="사진첨부리스트">
                            <img src="./assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                        <div class="사진첨부리스트">
                            <img src="./assets/icons/add.png"></img>
                            <div>클릭해서 사진 업로드</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer">
                <button id="푸터취소버튼">취소</button>
                <button id="푸터등록버튼">등록하기</button>

            </div>

        </>

    )
}