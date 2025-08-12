const makeUpdateHtml = (contentObj) => {
    switch(contentObj.feel) {
        case "행복해요": {
            document.getElementById("행복해요").checked = true;
            break
        }
        case "슬퍼요": {
            document.getElementById("슬퍼요").checked = true;
            break
        }
        case "놀랐어요": {
            document.getElementById("놀랐어요").checked = true;
            break
        }
        case "화나요": {
            document.getElementById("화나요").checked = true;
            break
        }
        case "기타": {
            document.getElementById("기타").checked = true;
            break
        }
        default:
    }
    
    const contentHTML = `
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
    `

    document.getElementById("update_html_flag").innerHTML = contentHTML
}