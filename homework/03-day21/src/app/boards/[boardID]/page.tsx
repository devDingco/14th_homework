"use client";

import React from 'react';
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client"
import { useParams } from 'next/navigation';

const FETCH_BOARD = gql `
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
        }
    
    }
`

const BoardsDetail = () => { 
    const { boardID } = useParams()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardID,
        },
    })


    return(
        <div className={styles.layout}>
            <div className={styles.container}>
                {/* 제목 자리 */}
                <div className={styles.detailSubjectText}>
                    {/* 살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                    쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 */}
                    {data?.fetchBoard?.title ?? "제목을 불러오는 중..."}
                </div>

                <div className={styles.detailMetadataContainer}>
                    <div className={styles.detailRowFlex}>
                        <div className={styles.detailMetadataProfile}>
                            <img src="/images/userprofile_default.png" alt="프로필"/>
                            {/* 작성자 자리 */}
                            <div>{data?.fetchBoard?.writer ?? "작성자 불러오는 중..."}</div>
                        </div>
                        <div>2024.11.11</div>
                    </div>
                    <hr className={styles.detailBorder}/>
                    <div className={styles.detailMetadataIconContainer}>
                        <img src="/images/link_icon.png" alt="링크아이콘" />
                        <img src="/images/location_icon.png" alt="위치아이콘" />
                    </div>
                </div>

                <img className={styles.detailContentContainer} src="/images/post_image.png" alt="청산사진"/>

                {/* 내용 자리 */}        
                <div className={styles.detailContentText}>
                    {data?.fetchBoard?.contents ?? "내용을 불러오는 중..."}
                    {/* 살겠노라 살겠노라. 청산에 살겠노라. <br />
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
                    얄리얄리 얄라셩 얄라리 얄라 <br /> */}
                </div>

                <img className={styles.detailVideoPreview} src="/images/video.png" alt="비디오프리뷰"/>

                <div className={styles.detailContentGoodOrBad}>
                    <div className={styles.detailBadContainer}>
                        <img src="/images/bad.png" alt="싫어요"/>
                        <div>24</div>
                    </div>
                    <div className={styles.detailGoodContainer}>
                        <img src="/images/good.png" alt="좋아요"/>
                        <div>12</div>
                    </div>
                </div>

                <div className={styles.detailButtonContainer}>
                    <button className={styles.detailButton}>
                        <img src="/images/list_icon.png" alt="목록아이콘"/>
                        <div>목록으로</div>
                    </button>
                    <button className={styles.detailButton}>
                        <img src="/images/edit_icon.png" alt="수정아이콘"/>
                        <div>수정하기</div>
                    </button>
                </div>                 
            </div>
        </div>
    )
}

export default BoardsDetail;
