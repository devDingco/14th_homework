const BoardsDetail = () => {

    const publishText = `
                살겠노라 살겠노라. 청산에 살겠노라.
                머루랑 다래를 먹고 청산에 살겠노라.
                얄리얄리 얄랑셩 얄라리 얄라

                우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
                너보다 시름 많은 나도 자고 일어나 우노라.
                얄리얄리 얄라셩 얄라리 얄라

                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
                이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
                얄리얄리 얄라셩 얄라리 얄라

                이럭저럭 하여 낮일랑 지내 왔건만
                올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
                얄리얄리 얄라셩 얄라리 얄라

                어디다 던지는 돌인가 누구를 맞히려던 돌인가.
                미워할 이도 사랑할 이도 없이 맞아서 우노라.
                얄리얄리 얄라셩 얄라리 얄라

                살겠노라 살겠노라. 바다에 살겠노라.
                나문재, 굴, 조개를 먹고 바다에 살겠노라.
                얄리얄리 얄라셩 얄라리 얄라

                가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
                얄리얄리 얄라셩 얄라리 얄라

                가다 보니 배불룩한 술독에 독한 술을 빚는구나.
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
                얄리얄리 얄라셩 얄라리 얄라
    `

    const goodBad = {
        good: 24,
        bad: 12
    }
    return (
        <div id="main">
            <h1 className="b_28_36">살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</h1>
            <header id="detail_header" className="header_1280w_80h flex_column">
                <div id="detail_header_top" className="header_top">
                    <div id="detail_profile" className="flex_row flex_align_items_center flex_justi_sb">
                        <img className="profile_img" src="/svg/person.png" alt="profile"/>
                        {/* <div className="profile_img"><img src="/svg/person.png" alt="profile"/></div> */}
                        <p className="r_14_20" style={{ color: "rgba(129, 129, 129, 1)" }}>2024.11.11</p>
                    </div>
                </div>
                <hr />
                <div id="detail_header_bottom" className="header_bottom flex_align_self_flexend">
                    <img className="img_24w_24h" src="/svg/link.png" alt="link"/>
                    <img className="img_24w_24h" src="/svg/location.png" alt="location"/>
                </div>
            </header>
            <img src="/image/Tranquil Beachside Serenity 1.png" alt="publish1"/>
            {publishText.split("\n").map((line, i) => (
                <span key={i}>
                {line}
                <br />
                </span>
            ))}
            <div className="detail_video flex_row flex_justi_center">
                <img src="/image/Frame 427323252.png" alt="publish2"/>
            </div>
            <div id="bad_good_btn_frame" className="bad_good_48h flex_row flex_justi_center">
                <div id="bad_area" className="bad_good_btn_frame flex_column flex_align_items_center">
                    <img src="/svg/bad.png" alt="bad"/>
                    <p className="r_14_20">{goodBad.bad}</p>
                </div>
                <div id="good_area" className="bad_good_btn_frame flex_column flex_align_items_center">
                    <img src="/svg/good.png" alt="good"/>
                    <p className="r_14_20" style={{ color: "rgba(246, 106, 106, 1)" }}>{goodBad.good}</p>
                </div>
            </div>
            <div className="detail_update flex_row flex_justi_center">
                <button className="flex_row flex_align_items_center">
                    <img src="/svg/menu.png" alt="menu"/>
                    <p className="sb_14_20" style={{ whiteSpace: "nowrap" }}>목록으로</p>
                </button>
                <button className="flex_row flex_align_items_center">
                    <img src="/svg/edit.png" alt="edit"/>
                    <p className="sb_14_20" style={{ whiteSpace: "nowrap" }}>수정하기</p>
                </button>
            </div>
        </div>
    )
}

export default BoardsDetail