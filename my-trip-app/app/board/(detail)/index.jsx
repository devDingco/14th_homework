import "./index.css";
import Link from "next/link";
import "../../global.css";
import Image from "next/image";
import { tripTalkMockData } from "../../common/utils/mocks-data";

export default function BoardDetail({ id }) {
  const post = tripTalkMockData.find((p) => p.id === id) || {
    id,
    title: "제목이 없습니다",
    coverImage: "/images/desktop/a.png",
    authorName: "작성자",
    authorProfileImage: "/images/mobile/profile/null.png",
    createdAt: "2024.01.01",
    likeCount: 0,
  };

  return (
    <div className="board_detail_page">
      <article className="board_detail">
        <header className="detail_header">
          <h1 className="b_28_36 detail_title">{post.title}</h1>
          <div className="detail_meta">
            <div className="author">
              <Image
                src={post.authorProfileImage}
                alt={post.authorName}
                width={32}
                height={32}
                className="author_avatar"
              />
              <span className="sb_16_24 author_name">{post.authorName}</span>
              <span className="r_14_20 date">{post.createdAt}</span>
            </div>
            <div className="icon_wrap">
              <Image src="/icons/outline/link.png" alt="like" width={24} height={24} />
              <Image src="/icons/outline/location.png" alt="comment" width={24} height={24} />
            </div>
          </div>
        </header>

        <section className="detail_content r_16_24">
          <div className="lead_section">
            <figure className="lead_media">
              <Image src={post.coverImage} alt="lead" width={260} height={200} />
            </figure>
            <div className="text_block">
              <p>
                햇살이 쏟아지는 바다와 함께했던 오늘의 기록입니다. 모래 위를 걷다 보면 시간이
                천천히 흐르는 것 같아요. 바람이 적당히 불고 파도 소리가 귓가를 간질이면, 그
                순간만큼은 모든 게 편안해집니다.
              </p>
              <p>
                작은 카페에 들러 따뜻한 커피를 한 잔 마시고, 길을 따라 걷다가 우연히 찾은
                포토 스팟에서 사진도 몇 장 남겼습니다. 다음엔 더 많은 곳을 둘러보고 싶네요.
              </p>
              <p>
                오늘의 소소한 순간들을 기록으로 남기며, 다음 여행을 또 계획해 봅니다. 이
                페이지는 그중 일부를 보여주는 작은 앨범이에요.
              </p>
            </div>
          </div>

          <div className="detail_media wide">
            <div className="media_wrap">
              <Image src="/images/desktop/detail-page-1.png" alt="detail-1" width={1024} height={576} />
              <div className="play_badge">▶</div>
            </div>
          </div>
        </section>

        <footer className="detail_actions">
          <div className="bottom_actions">
            <button type="button" className="btn btn-outline">목록으로</button>
            <div className="reactions">
              <button type="button" className="btn btn-outline">추천하기</button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}