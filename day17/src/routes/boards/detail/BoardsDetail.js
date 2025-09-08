import "./BoardsDetail.css";
import location from "../../../assets/location.png";
import pencil from "../../../assets/pencil.png";
import profileImage from "../../../assets/profile_image.png";
import link from "../../../assets/link.png";
import heart from "../../../assets/heart.png";
import openthesea from "../../../assets/openthesea.png";


const BoardsDetail = () => {
    return (
        <div className="Css_detail_page_body">


            <div className="detail-layout">
                <div className="detail-body">
                    <div className="detail-frame">
                        <div className="detail-subject">
                            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
                        </div>
                        <div className="detail-metadata-container">
                            <div className="detail-metadata-profile">
                                <img src={profileImage} alt="프로필이미지" />
                                <div>홍길동</div>
                            </div>
                            <div className="detail-metadata-date">2024.11.11</div>
                        </div>
                        <div className="enroll-border"></div>
                        <div className="detail-metadata-icon-container">
                            {/* linkImage -> link 로 수정 */}
                            <img src={link} alt="링크아이콘" />
                            {/* locationImage -> location 으로 수정 */}
                            <img src={location} alt="위치아이콘" />
                        </div>
                        <div className="detail-content-container">
                        <img src={openthesea} alt="바다사진" className="detail-content-image"/>

                            <div className="detail-content-text">
                                <div>살겠노라 살겠노라. 청산에 살겠노라.</div>
                                <div>머루랑 다래를 먹고 청산에 살겠노라.</div>
                                <div>얄리얄리 얄랑셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>우는구나 우는구나 새야. 자고 일어나 우는구나 새야.</div>
                                <div>너보다 시름 많은 나도 자고 일어나 우노라.</div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>
                                    갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
                                </div>
                                <div>이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.</div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>이럭저럭 하여 낮일랑 지내 왔건만</div>
                                <div>올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.</div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>어디다 던지는 돌인가 누구를 맞히려던 돌인가.</div>
                                <div>미워할 이도 사랑할 이도 없이 맞아서 우노라.</div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>살겠노라 살겠노라. 바다에 살겠노라.</div>
                                <div>나문재, 굴, 조개를 먹고 바다에 살겠노라.</div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.</div>
                                <div>
                                    사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
                                </div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                                <div className="text-gap"></div>
                                <div>가다 보니 배불룩한 술독에 독한 술을 빚는구나.</div>
                                <div>
                                    조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
                                </div>
                                <div>얄리얄리 얄라셩 얄라리 얄라</div>
                            </div>
                            {/* neotubeImage import 필요 */}
                            {/* <img src={neotubeImage} alt="너튜브사진" /> */}
                            <div className="detail-content-goodorbad">
                                <div className="detail-good-container">
                                    {/* badImage import 필요 */}
                                    {/* <img src={badImage} alt="싫어요" /> */}
                                    <div className="detail-bad-text">24</div>
                                </div>
                                <div className="detail-good-container">
                                    {/* goodImage -> heart 로 수정 */}
                                    <img src={heart} alt="좋아요" />
                                    <div className="detail-good-text">12</div>
                                </div>
                            </div>
                            <div className="detail-buttons-container">
                                <button className="detail-button">
                                    {/* hamburger import 필요 */}
                                    {/* <img alt="목록아이콘" src={hamburger} /> */}
                                    <div>목록으로</div>
                                </button>
                                <button className="detail-button">
                                    <img alt="수정아이콘" src={pencil} />
                                    <div>수정하기</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardsDetail;

// 아래의 불필요한 코드들을 모두 삭제했습니다.
//    </div>
//   )
// }
//
// /
//
// // export default function BoardDetail() {
// //     const { boardId } = useParams();
// //     const post = FAKE_POST_DATA;
//
// //     return (
// //         <div className="board-detail">
// //             {/* ... (제목, 헤더 등 이전 코드와 동일) ... */}
// //             <h1 className="board-detail__title">{post.title}</h1>
// //             {/* ... */}
// //             <div className="board-detail__divider"></div>
//
// //             <div className="board-detail__content">
// //                 {post.imageUrl && <img src={post.imageUrl} alt="게시물 이미지" className="board-detail__image" />}
                
// //                 {/* 바로 이 부분입니다! */}
// //                 <div className="board-detail__text">
// //                     {post.contents.split('/ line이 비어있으면 <br\n').map((line, index) => (
// //                         / /> 태그로 진짜 '빈 줄'을 만들어줍니다.
// //                         line ? <div key={index}>{line}</div> : <br key={index} />
// //                     ))}
// //                 </div>
                
// //                 {/* ... (유튜브, 좋아요/싫어요, 푸터 등 이전 코드와 동일) ... */}
// //             </div>
// //             {/* ... */}
// //         </div>
// //     );
// // }; 여기서  } 이거가 잘못 되었지