const Post = () => {
    return (
        <div id="main">
            <h1 className="b_20_28">게시물 등록</h1>
            <div id="main_container">
                <section id="write_form_container">
                    <form className="write_form_80h flex_row">
                        <WriteInput label={"작성자"} placeholder={"작성자 명을 입력해 주세요."}/>
                        <WriteInput label={"비밀번호"} placeholder={"비밀번호를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_80h flex_row">
                        <WriteInput label={"제목"} placeholder={"제목을 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_368h flex_row">
                        <WriteInput label={"내용"} placeholder={"내용을 입력해 주세요."}/>
                    </form>
                    <form className="write_form_192h flex_column">
                        <WriteInput label={"주소"} placeholder={"주소를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_80h flex_row">
                        <WriteInput label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."}/>
                    </form>
                    <hr />
                    <form className="write_form_192h flex_row">
                        <WriteInput label={"사진 첨부"}/>
                    </form>
                </section>
                <div id="write_confirm_container" className="flex_row flex_justi_end">
                    <WriteButton p="취소"/>
                    <WriteButton p="등록하기"/>
                </div>
            </div>
        </div>
    )
}