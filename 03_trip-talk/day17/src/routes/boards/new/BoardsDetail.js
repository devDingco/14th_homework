import { Header, IconButton } from '../../../components'
import '../../../styles/BoardsDetail.css'
import {
  LinkIcon,
  ProfileIcon,
  LocationIcon,
  BadIcon,
  GoodIcon,
  ListIcon,
  EditIcon,
} from '../../../assets/icons'
import { postImg1 } from '../../../assets/images'

const tempTitle = `살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라`
const tempContents = `살겠노라 살겠노라. 청산에 살겠노라.
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
얄리얄리 얄라셩 얄라리 얄라`

const BoardsDetail = () => {
  return (
    <div className="container">
      <div className="detail-post">
        <Header title={tempTitle} />

        {/* details option */}
        <div className="detail-post-details">
          <div className="detail-post-info">
            <div className="detail-post-profile">
              <ProfileIcon />
              <p>{'홍길동'}</p>
            </div>
            <p>2024.11.11</p>
          </div>
          <hr />
          <div className="detail-post-func">
            <LinkIcon />
            <LocationIcon />
          </div>
        </div>

        {/* images */}
        <img src={postImg1} className="detail-post-image" />

        {/* contents */}
        <div className="detail-post-contents">{tempContents}</div>

        {/* youtube link */}
        <div className="detail-post-youtube">
          <iframe src="https://www.youtube.com/embed/sQNvtxKMX3w"></iframe>
        </div>

        {/* dis-like button */}
        <div className="detail-post-likes">
          <div className="detail-post-like">
            <BadIcon />
            <p>24</p>
          </div>
          <div className="detail-post-like">
            <GoodIcon />
            <p>12</p>
          </div>
        </div>

        {/* active button */}
        <div className="detail-post-active">
          <IconButton content="목록으로">
            <ListIcon />
          </IconButton>
          <IconButton content="수정하기">
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default BoardsDetail
