const printUpdate = () => {
    makeUpdateHtml(getContentNumber())
}

const makeUpdateHtml = (contentObj) => {
    const contentHTML = `
    <div id="update_feel_container">
        <p>오늘 기분은 어땟나요?</p>
        <form id="update_feeling_radio_container">
            <label id="feeling_radio_content">
                <input type="radio" name="feel" value="행복해요" id="행복해요"/><p>행복해요</p>
            </label>
            <label id="feeling_radio_content">
                <input type="radio" name="feel" value="슬퍼요" id="슬퍼요"/><p>슬퍼요</p>
            </label>
            <label id="feeling_radio_content">
                <input type="radio" name="feel" value="놀랐어요" id="놀랐어요"/><p>놀랐어요</p>
            </label>
            <label id="feeling_radio_content">
                <input type="radio" name="feel" value="화나요" id="화나요"/><p>화나요</p>
            </label>
            <label id="feeling_radio_content">
                <input type="radio" name="feel" value="기타" id="기타"/><p>기타</p>
            </label>
        </form>
    </div>
    <div id="update_html_flag">
        <div id="update_title_container">
            <p>제목</p>
            <div id="update_title_input_container">
                <textarea id="update_title_input">${contentObj.title}</textarea>
            </div>
        </div>
        <div id="update_detail_container">
            <p>내용</p>
            <div id="update_detail_input_container">
                <textarea id="update_detail_input">${contentObj.detail}</textarea>
            </div>
        </div>
    </div>
    <div id="update_button_frame">
        <button type="button" id="update_cancel_button"><a href="../index.html">취소</a></button>
        <button type="button" id="update_confirm_button" onclick="confirmUpdate()"><a>수정 하기</a></button>
    </div>
    `

    document.getElementById("main").innerHTML = contentHTML

    switch(contentObj.feel) {
        case "행복해요": {
            document.getElementById("행복해요").checked = true
            break
        }
        case "슬퍼요": {
            document.getElementById("슬퍼요").checked = true
            break
        }
        case "놀랐어요": {
            document.getElementById("놀랐어요").checked = true
            break
        }
        case "화나요": {
            document.getElementById("화나요").checked = true
            break
        }
        case "기타": {
            document.getElementById("기타").checked = true
            break
        }
        default:
    }

    document.getElementById("input_reply").disabled = true
    document.getElementById("input_reply").placeholder = "수정중엔 회고를 작성할 수 없어요."
    document.getElementById("input_reply").style = "background: var(--Gray-Gray-50, rgba(242, 242, 242, 1));"
}