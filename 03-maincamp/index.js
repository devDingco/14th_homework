const 메인페이지 = () => {

    return (
        <div class="container">
        <header>
            <h1>게시물등록</h1>
        </header>
        <main>
            <section class="메인__작성자비밀번호섹션">
                <section class="메인__작성자비밀번호섹션__작성자섹션">
                    <h2>작성자<img src="./assets/images/별표.png"/></h2>
                    <input type="text" placeholder="작성자 명을 입력해주세요"/>
                </section>
                <section class="메인__작성자비밀번호섹션__비밀번호섹션">
                    <h2>비밀번호<img src="./assets/images/별표.png"/></h2>
                    <input type="text" placeholder="비밀번호를 입력해주세요"/>
                </section>
            </section>
            <hr/>
            <section class="메인__제목섹션">
                <h2>제목<img src="./assets/images/별표.png"/></h2>
                <input type="text" placeholder="제목 입력해주세요"/>
            </section>
            <hr/>
            <section class="메인__내용섹션">
                <h2>내용<img src="./assets/images/별표.png"/></h2>
                <input type="text" placeholder="내용을 입력해주세요"/>
            </section>
            <section class="메인__주소섹션">
                <article class="메인__주소섹션__상단아티클">
                    <h2>주소</h2>
                    <div class="메인__주소섹션__상단아티클__내용">
                        <input value="01234" type="text" disabled/>
                        <button>우편번호 검색</button>

                    </div>
                </article>
                <input type="text" placeholder="주소를 입력해주세요"/>
                <input type="text" placeholder="상세주소"/>
            </section>
            <hr/>
            <section class="메인__유뷰트링크섹션">
                <h2>유튜브링크</h2>
                <input type="text" placeholder="링크를 입력해주세요"/>
            </section>
            <hr/>
            <section class="메인__사진첨부섹션">
                <h2>사진첨부</h2>
                <article class="메인__사진첨부섹션__아티클">
                    <button><img src="./assets/images/사진업로드.png"/></button>
                    <button><img src="./assets/images/사진업로드.png"/></button>
                    <button><img src="./assets/images/사진업로드.png"/></button>
                </article>
            </section>
            <section class="메인__등록하기섹션">
                <button class="메인__등록하기섹션__취소버튼">취소</button>
                <button class="메인__등록하기섹션__등록하기버튼">등록하기</button>
            </section>

        </main>
     </div>
        
    )
}