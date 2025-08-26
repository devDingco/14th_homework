const 메인페이지 = () => {
    const 작성자_타이틀 = "작성자"
    const 작성자 = "작성자 명을 입력해주세요."
    const 비밀번호_타이틀 = "비밀번호"
    const 비밀번호 = "비밀번호를 입력해주세요."
    const 제목_타이틀 = "제목"
    const 제목 = "제목을 입력해 주세요."
    const 내용_타이틀 = "내용"
    const 내용 = "내용을 입력해 주세요."
    const 주소 = "주소를 입력해 주세요."
    const 상세주소 = "상세주소"
    const 유튜브링크_타이틀 = "유튜브링크"
    const 링크 = "링크를 입력해주세요."
    const 별 = "*"

    return (
        <>
            <div className="전체">
                <div className="헤더"></div>
                <div className="바디">
                    <div className="게시글_폼_제목">게시글 등록</div>
                    <div className="게시글_폼">
                        <div className="게시글_폼_상세">
                            <div className="게시글_인풋블록">
                                <작은인풋 Input_Title={작성자_타이틀} Input_Placeholder={작성자} Input_Star={별}/>
                                <작은인풋 Input_Title={비밀번호_타이틀} Input_Placeholder={비밀번호} Input_Star={별}/>
                            </div>
                            <분리선 />
                            <div className="게시글_인풋블록">
                                <긴인풋 Input_Title={제목_타이틀} Input_Placeholder={제목} Input_Star={별}/>
                            </div>
                            <분리선 />
                            <div className="게시글_인풋블록">
                                <큰인풋 Input_Title={내용_타이틀} Input_Placeholder={내용} Input_Star={별}/>
                            </div>
                            <div className="게시글_인풋블록쌓기">
                                <div className="주소인풋이랑버튼">
                                    주소
                                    <div className="인풋이랑버튼">
                                        <input className="우편번호인풋" placeholder="01234"></input>
                                        <button className="우편번호검색">우편번호 검색</button>
                                    </div>
                                </div>
                                <긴인풋 Input_Placeholder={주소}/>
                                <긴인풋 Input_Placeholder={상세주소}/>
                            </div>
                            <분리선 />
                            <div className="게시글_인풋블록">
                                <긴인풋 Input_Title={유튜브링크_타이틀} Input_Placeholder={링크}/>
                            </div>
                            <분리선 />
                            <div className="게시글_인풋블록쌓기">
                                <span>사진첨부</span>
                                <div className="사진첨부_그룹">
                                    <div className="사진첨부">
                                        <img src="./assets/add.png" className="더하기이미지"></img>
                                        클릭해서 사진 업로드
                                    </div>
                                    <div className="사진첨부">
                                        <img src="./assets/add.png" className="더하기이미지"></img>
                                        클릭해서 사진 업로드
                                    </div><div className="사진첨부">
                                        <img src="./assets/add.png" className="더하기이미지"></img>
                                        클릭해서 사진 업로드
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="게시글_폼_버튼">
                            <button className="취소">취소</button>
                            <button className="등록">등록하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}