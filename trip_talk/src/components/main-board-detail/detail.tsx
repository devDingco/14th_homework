'use client';

import './detail.css';
import Image from 'next/image';
import FeedbackForm from '@/commons/feedbackForm/feedbackForm';
import { useRouter } from 'next/navigation';

export default function Detail() {
  const router = useRouter();
  return (
    <div className="container">
      <div className="detail_header">
        <div className="b_28_36">
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리
          얄라
        </div>
        <div className="detail_header_info">
          <div className="detail_header_info_profile">
            <Image src="/images/profile/profile06.png" alt="profile" width={24} height={24} />
            <span className="detail_header_info_name l_14_20">홍길동</span>
          </div>
          <div className="detail_header_info_date l_14_20">24.11.11</div>
        </div>
      </div>
      <div className="detail_content_wrapper">
        <div className="detail_address me_14_20">서울 특별시 강남구 신논현로 111-6</div>
        <div className="detail_content r_16_24">
          <Image src="/images/detail/detail_mock.png" alt="detail" width={400} height={531} />
          <br />
          살겠노라 살겠노라. 청산에 살겠노라.
          <br /> 머루랑 다래를 먹고 청산에 살겠노라.
          <br /> 얄리얄리 얄랑셩 얄라리 얄라
          <br />
          <br /> 우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
          <br /> 너보다 시름 많은 나도 자고 일어나 우노라.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
          <br /> 이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 이럭저럭 하여 낮일랑 지내 왔건만
          <br /> 올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 어디다 던지는 돌인가 누구를 맞히려던 돌인가.
          <br /> 미워할 이도 사랑할 이도 없이 맞아서 우노라.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 살겠노라 살겠노라. 바다에 살겠노라.
          <br /> 나문재, 굴, 조개를 먹고 바다에 살겠노라.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
          <br /> 사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
          <br /> 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br /> 가다 보니 배불룩한 술독에 독한 술을 빚는구나.
          <br /> 조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
          <br /> 얄리얄리 얄라셩 얄라리 얄라 얄라
        </div>
        <div className="detail_content_video_section">
          <Image src="/images/detail/detail_bottom_mock.png" alt="detail" width={822} height={464} priority />
        </div>

        <div className="detail_content_like_section">
          <div className="detail_like_wrapper">
            <Image src="/icons/bad.png" alt="detail" width={24} height={24} />
            <span className="detail_like_count dislike r_14_20">24</span>
          </div>
          <div className="detail_like_wrapper">
            <Image src="/icons/good.png" alt="detail" width={24} height={24} />
            <span className="detail_like_count r_14_20">12</span>
          </div>
        </div>
        <div className="detail_content_button_section">
          <div className="detail_content_button_item">
            <Image src="/icons/hamburger.png" alt="detail" width={24} height={24} />
            <span className="sb_14_20" onClick={() => router.push('/')}>
              목록으로
            </span>
          </div>
          <div className="detail_content_button_item">
            <Image src="/icons/pencil.png" alt="detail" width={24} height={24} />
            <span className="sb_14_20">수정하기</span>
          </div>
        </div>
      </div>
      <FeedbackForm type="댓글" />
    </div>
  );
}
