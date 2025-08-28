import React from 'react';
import './BoardsDetail.css';

const BoardsDetail = () => {

    return (
        <div className="게시물상세화면">
            <div className="Title">살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라</div>
            <div className="writerDate">
                <div className="writerP">
                    <div className="icon writerIcon"></div>
                    <div className="writer">홍길동</div>
                </div>
                <div className="Date">2024.11.11</div>
            </div>
            <div className="icons">
                <div className="icon link"></div>
                <div className="icon location"></div>
            </div>
            <div className="사진"></div>
            <div className="Content">
                살겠노라 살겠노라. 청산에 살겠노라.<br />
                머루랑 다래를 먹고 청산에 살겠노라.<br />
                얄리얄리 얄랑셩 얄라리 얄라<br /><br />

                우는구나 우는구나 새야. 자고 일어나 우는구나 새야.<br />
                너보다 시름 많은 나도 자고 일어나 우노라.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐<br />
                이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                이럭저럭 하여 낮일랑 지내 왔건만<br />
                올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                어디다 던지는 돌인가 누구를 맞히려던 돌인가.<br />
                미워할 이도 사랑할 이도 없이 맞아서 우노라.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                살겠노라 살겠노라. 바다에 살겠노라.<br />
                나문재, 굴, 조개를 먹고 바다에 살겠노라.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.<br />
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.<br />
                얄리얄리 얄라셩 얄라리 얄라<br /><br />

                가다 보니 배불룩한 술독에 독한 술을 빚는구나.<br />
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]<br />
                얄리얄리 얄라셩 얄라리 얄라</div>
            <div className="VideoP">
                <div className="exampleVideo"></div>
            </div>
            <div className="heartP">
                <div classname="heart">
                    <div className="icon brokenHeart"></div>
                    <div className="badNumber">24</div>
                </div>
                <div classname="heart">
                    <div className="icon redHeart"></div>
                    <div className="goodNumber">12</div>
                </div>
            </div>
            <div className="buttons">
                <button className="버튼들">
                    <div className="icon 목록으로"></div>
                    <div className="btnText">목록으로</div>
                </button>
                <button className="버튼들">
                <div className="icon 수정하기"></div>
                <div className="btnText">수정하기</div>
                </button>
            </div>
        </div>
        
    )
}

export default BoardsDetail;