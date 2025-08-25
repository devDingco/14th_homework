const ResistPostPage = () => {
    return (
        <div id="main">
            <h1 class="b_20_28">게시물 등록</h1>
            <div id="main_container">
                <section id="write_form_container">
                    <form class="write_form_80h flex_row">
                        <WriteInput label={"작성자"} placeholder={"작성자 명을 입력해 주세요."}/>
                        <WriteInput label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form class="write_form_80h flex_row">
                        <div class="input_frame_1280w_80h flex_column">
                            <label class="label_1280w_24h me_16_24">제목</label>
                            <input class="input_1280w_48h input_border_gray r_16_24" placeholder="제목을 입력해 주세요."></input>
                        </div>
                    </form>
                    <hr />
                    <form class="write_form_368h flex_row">
                        <div class="input_frame_1280w_336h flex_column">
                            <label class="label_1280w_24h me_16_24">내용</label>
                            <textarea class="textarea_1280w_336h input_border_gray r_16_24" placeholder="내용을 입력해 주세요."></textarea>
                        </div>
                    </form>
                    <form class="write_form_192h flex_column">
                        <div class="input_frame_220w_80h flex_column">
                            <label class="label_220w_24h me_16_24">주소</label>
                            <div class="input_frame_220w_48h flex_row">
                                <input class="input_82w_48h input_border_gray r_16_24" placeholder="01234"></input>
                                <button class="zip_btn sb_18_24" style={{ whiteSpace: "nowrap" }}>우편번호 검색</button>
                            </div>
                        </div>
                        <div>
                            <input class="input_1280w_48h input_border_gray r_16_24" placeholder="주소를 입력해 주세요."></input>
                        </div>
                        <div>
                            <input class="input_1280w_48h input_border_gray r_16_24" placeholder="상세주소"></input>
                        </div>
                    </form>
                    <hr />
                    <form class="write_form_80h flex_row">
                        <div class="input_frame_1280w_80h flex_column">
                            <label class="label_1280w_24h me_16_24">유튜브 링크</label>
                            <input class="input_1280w_48h input_border_gray r_16_24" placeholder="링크를 입력해 주세요."></input>
                        </div>
                    </form>
                    <hr />
                    <form class="write_form_192h flex_row">
                        <div>
                            <label class="label_1280w_24h">사진 첨부</label>
                            <div></div>
                        </div>
                    </form>
                </section>
                <div id="write_confirm_container" class="flex_row flex_justi_end">
                    <button class="write_cancel_btn sb_18_24" style={{ whiteSpace: "nowrap" }}>취소</button>
                    <button class="write_confirm_btn sb_18_24">등록하기</button>
                </div>
            </div>
        </div>
    )
}