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
            <p>${contentObj.detail}</p>
        </div>
        <div id="detail_bottom_container" class="">            
            <button class="body01 go_update_button" onclick="printUpdate()">수정</button>
            <button class="body01 delete_button" onclick="">삭제</button>
        </div>
    `
    document.getElementById("main").innerHTML = contentHTML
}