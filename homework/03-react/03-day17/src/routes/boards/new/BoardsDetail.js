import React, {useState} from 'react';
import './BoardsDetail.css'

import userprofile from './assets/userprofile_default.png'
import link_icon from './assets/link.png'
import location_icon from './assets/location.png'
import video from './assets/video.png'
import post_image from './assets/post_image.png'
import bad_icon from './assets/heart_break.png'
import good_icon from './assets/heart.png'
import list_icon from './assets/list.png'
import edit_icon from './assets/edit.png'

const BoardsDetail = () => { 

    return(
        <div className="layout">
            <div className="container">
                <div
                    className="detail-subject-text"
                >
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
                </div>

                <div className = "flex-half">
                    <div className="detail-row-flex">
                        <div className="detail-profile">
                            <img src={userprofile}/>
                            <div>홍길동</div>
                        </div>
                        <div>2024.11.11</div>
                    </div>
                    <hr className="detail-border"/>
                    <div className='detail-row-section'>
                        <img src={link_icon} />
                        <img src={location_icon} />
                    </div>
                </div>

                <img className='picture-detail' src={post_image}/>

                <div className="detail-content-text">
                    살겠노라 살겠노라. 청산에 살겠노라. <br />
                    머루랑 다래를 먹고 청산에 살겠노라. <br />
                    얄리얄리 얄랑셩 얄라리 얄라 <br />
                    <br />
                    우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br />
                    너보다 시름 많은 나도 자고 일어나 우노라. <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 <br />
                    이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.<br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    이럭저럭 하여 낮일랑 지내 왔건만 <br />
                    올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가. <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
                    미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    살겠노라 살겠노라. 바다에 살겠노라. <br />
                    나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br />
                    사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                    <br />
                    가다 보니 배불룩한 술독에 독한 술을 빚는구나.<br />
                    조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1] <br />
                    얄리얄리 얄라셩 얄라리 얄라 <br />
                </div>
                <img className='video-preview' src={video} />

                <div className='heart-button-container'>
                    <div className='detail-bad-button'>
                        <img src={bad_icon}/>
                        <div>24</div>
                    </div>
                    <div className='detail-good-button'>
                        <img src={good_icon}/>
                        <div>12</div>
                    </div>
                </div>
                <div className='detail-button-container'>
                    <button className='detail-list-button'>
                        <img src={list_icon} />
                        <div>목록으로</div>
                    </button>
                    <button className='detail-edit-button'>
                        <img src={edit_icon} />
                        <div>수정하기</div>
                    </button>
                </div>                 
            </div>
        </div>
    )
}

export default BoardsDetail;