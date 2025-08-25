import "./index.css";
import "../../global.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import Link from "next/link";
import { tripTalkMockData } from "@common/utils/mocks-data";
import CommentSection from "@components/comment/commentSection";

export default function BoardDetail({ id }) {
  const post = tripTalkMockData.find((p) => p.id === id) || {
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
              <Icon outline name="link" default className="link_icon"/>
              <Icon outline name="location" default className="location_icon"/>
            </div>
          </div>
        </header>

        <section className="detail_content r_16_24">
          <div className="lead_section">
            <figure className="lead_media">
              <Image src={post.coverImage} alt="lead" width={260} height={200} />
            </figure>
            <div className="text_block r_16_24 content">
              <p>
                햇살이 쏟아지는 바다와 함께했던 오늘의 기록입니다. <br />
                모래 위를 걷다 보면 시간이 천천히 흐르는 것 같아요. <br />
                바람이 적당히 불고 파도 소리가 귓가를 간질이면, <br />
                그 순간만큼은 모든 게 편안해집니다.
              </p>
              <p>
                작은 카페에 들러 따뜻한 커피를 한 잔 마시고,<br />
                길을 따라 걷다가 우연히 찾은 포토 스팟에서 사진도 몇 장 남겼습니다. <br />
                다음엔 더 많은 곳을 둘러보고 싶네요.
              </p>
              <p>
                오늘의 소소한 순간들을 기록으로 남기며, 다음 여행을 또 계획해 봅니다. <br />
                이 페이지는 그중 일부를 보여주는 작은 앨범이에요.
              </p>
            </div>
          </div>

          <div className="detail_media wide">
            <div className="media_wrap">
              <Image src="/images/desktop/detail-page-1.png" alt="detail-1" width={709} height={576} />
              <div className="play_badge">
                <span className="triangle_icon" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

          <article className="like_section">
            <div className="like_wrap">
              <div className="like_icon">
                <Icon outline name="bad" color="var(--gray-70)"/>
              </div>
              <div className="unlike_count">
                <span className="r_16_24" style={{ color: "var(--gray-70)" }}>{post.badCount}</span>
              </div>
            </div>
            <div className="like_wrap">
              <div className="like_icon">
                <Icon outline name="good" red className="like_icon"/>
              </div>
              <div className="like_count">
                <span className="r_16_24" style={{ color: "var(--red)" }}>{post.likeCount}</span>
              </div>
            </div>
          </article>

          <CommentSection initialComments={[]} />

        <footer className="detail_actions">
          <div className="bottom_actions">
            <button type="button" className="btn-outline">
              <Icon outline name="menu" default width={24} height={24}/>
              목록으로
            </button>
            <div className="reactions">
              <button type="button" className="btn-outline">
                <Icon outline name="edit" default width={24} height={24}/>
                수정하기
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}