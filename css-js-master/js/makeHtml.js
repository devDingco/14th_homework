// 메인페이지 화면
const makeMainHtml = (contentArr) => {
    const contentHTML = contentArr.map((v) => {
        let imgSrc
        let feelColor
        // rgba(234, 87, 87, 1);
        // rgba(40, 180, 225, 1);
        // rgba(213, 144, 41, 1);
        // rgba(119, 119, 119, 1);
        // rgba(162, 41, 237, 1);
        switch(v.feel) {
            case "행복해요": {
                imgSrc = `./images/행복해요 (m).png`
                feelColor = `rgba(234, 87, 87, 1);`
                break
            }
            case "슬퍼요": {
                imgSrc = `./images/슬퍼요 (m).png`
                feelColor = `rgba(40, 180, 225, 1);`
                break
            }
            case "놀랐어요": {
                imgSrc = `./images/놀랐어요 (m).png`
                feelColor = `rgba(213, 144, 41, 1);`
                break
            }
            case "화나요": {
                imgSrc = `./images/화나요 (m).png`
                feelColor = `rgba(119, 119, 119, 1);`
                break
            }
            case "기타": {
                imgSrc = `./images/기타 (m).png`
                feelColor = `rgba(162, 41, 237, 1);`
                break
            }
            default:
        }
        return `
            <div id="diary#${v.number}" class="diary_content">
                <a id="img_frame" href="./pages/detail.html?number=${v.number}">
                    <img src="${imgSrc}"/>
                </a>
                <div id="view_content_detail">
                    <div id="top_view_content_detail">
                        <p class="body01" style="color: ${feelColor}">
                            ${v.feel}
                        </p>
                        <p class="body04" style="color: rgba(145, 145, 145, 1);">
                            ${v.date}
                        </p>
                    </div>
                    <div id="bottom_view_content_detail">
                        <a class="title01" href="./pages/detail.html?number=${v.number}">
                            ${v.title}
                        </a>
                    </div>
                </div>
                <img src="./images/close_outline_light_m.svg" id="content_delete_button" onclick="openDeleteModal('main_delete_modal_group',${v.number},'일기콘텐츠')" />
            </div>
        `
    }).join("")

    document.getElementById("diary_container").innerHTML = `
        <div id="diary_box_container" class="">
            ${contentHTML}
        </div>
    `

    return contentHTML
}

// 상세페이지 화면
const makeDetailHtml = (contentObj) => {
    let imgSrc
    let feelColor
    switch(contentObj.feel) {
        case "행복해요": {
            imgSrc = `../images/행복해요 (s).png`
            feelColor = `rgba(234, 87, 87, 1);`
            break
        }
        case "슬퍼요": {
            imgSrc = `../images/슬퍼요 (s).png`
            feelColor = `rgba(40, 180, 225, 1);`
            break
        }
        case "놀랐어요": {
            imgSrc = `../images/놀랐어요 (s).png`
            feelColor = `rgba(213, 144, 41, 1);`
            break
        }
        case "화나요": {
            imgSrc = `../images/화나요 (s).png`
            feelColor = `rgba(119, 119, 119, 1);`
            break
        }
        case "기타": {
            imgSrc = `../images/기타 (s).png`
            feelColor = `rgba(162, 41, 237, 1);`
            break
        }
        default:
    }

    const contentHTML = `
        <div id="detail_top_container" class="">
            <div id="detail_title_container">
                <p class="title01">${contentObj.title}</p>
            </div>
            <div id="detail_feel_container">
                <div id="detail_feel_frame">
                    <img src="${imgSrc}" width="32px"/>
                    <p class="headline02" style="color: ${feelColor};">${contentObj.feel}</p>
                </div>
                <div id="date_frame">
                    <p class="body04">${contentObj.date}</p>
                </div>
            </div>
        </div>
        <div id="detail_content_container" class="">
            <p class="title02">내용</p>
            <p id="detail_content">${contentObj.detail}</p>
        </div>
        <div id="copy_detail_frame">
            <div id="copy_detail_container">
                <img src="../images/copy_outline_light_m.svg" onclick="successCopyDetail()"/>
                <p>내용 복사</p>
            </div>
        </div>
        <div id="detail_bottom_container" class="">            
            <button class="body01 go_update_button" onclick="printUpdate()">수정</button>
            <button class="body01 delete_button" onclick="openDeleteModal('detail_delete_modal_group',${contentObj.number},'일기콘텐츠디테일')">삭제</button>
        </div>
    `
    document.getElementById("main").innerHTML = contentHTML
}

// 상세페이지 - 수정 화면
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
        <button type="button" id="update_confirm_button" onclick="confirmUpdate('일기콘텐츠')"><a>수정 하기</a></button>
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

const makeReplyHtml = (contentObj) => {
    const contentHTML = contentObj.reply.map((v) => {
        return `
            <div class="reply_text_frame">
                <p id="reply_text">${v.content}</p>
                <p id="reply_date">[${v.date}]</p>
            </div>
            <hr>
        `
    }).join("")

    document.getElementById("reply_content_flag").innerHTML = contentHTML
}

// 일기 번호를 받아 수정화면 생성
const printUpdate = () => {
    makeUpdateHtml(getContentNumber())
}

const resetResistHtml = () => {
    document.getElementById('detail_input').value = '';
    document.getElementById('title_input').value = '';
    document.querySelectorAll('input[name="feel"]').forEach(radio => {
        radio.checked = false;
    });
}

// 메인페이지 사진보관함
const makePicStorageHtml = async () => {
    const dogHtml = await getDogApi()
    console.log(dogHtml)
    document.getElementById("diary_container").innerHTML = `
        <div id="pic_box_container">
            ${dogHtml}
        </div>
    `
}

// 메인페이지 필터
const makeMainFilterHtml = (storage) => { // <string>
    switch (storage) {
        case "일기보관함": {
            document.getElementById("filter_container").innerHTML = `
                <select id="diary_filter" class="storage_filter" onchange="viewDiaryFilter()">
                    <option value="전체">전체</option>
                    <option value="행복해요">행복해요</option>
                    <option value="슬퍼요">슬퍼요</option>
                    <option value="놀랐어요">놀랐어요</option>
                    <option value="화나요">바나나</option>
                    <option value="기타">기타</option>
                </select>
                <button id="diary_resist_button" onclick="openModal('main_write_modal_group')">
                    <div id="diary_resist_button_frame">
                        <img src="./images/plus_outline_light_m.svg" />
                        <p>일기쓰기</p>
                    </div>
                </button>
            `
            break
        }
        case "사진보관함":{
            document.getElementById("filter_container").innerHTML = `
                <select id="pic_filter" class="storage_filter" onchange="">
                    <option value="기본형">기본형</option>
                    <option value="가로형">가로형</option>
                    <option value="세로형">세로형</option>
                </select>
            `
            break
        }
        default:
    } 
    
}