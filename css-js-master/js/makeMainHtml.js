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
                <img src="${imgSrc}"/>
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
            </div>
        `
    }).join("")

    return contentHTML
}