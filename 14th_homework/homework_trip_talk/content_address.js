const 내용_주소_등록기능 = () => {

    return(
        <div class="내용_주소_등록영역">
            <div class="내용영역">
                <span>내용</span><img src="./assets/_.png"/>
                <textarea type= "text" placeholder="내용을 입력해 주세요."/>
            </div>
            <div class="주소영역">
                <div>주소</div>
                <div class="우편번호">
                    <div class="우편번호노출영역"></div><button class="우편번호검색버튼">우편번호검색</button>
                </div>
                <div class="주소노출영역"></div>
                <input class="상세주소입력영역" type="text" placeholder="상세주소"/>
            </div>
        </div>


    )
}