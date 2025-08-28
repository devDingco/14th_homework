import Image from 'next/image';
import './my-panel.css';

export default function MyPanel() {
  return (
    <div className="my_panel">
      <div className="my_panel_title sb_18_24">내 정보</div>
      <div className="my_panel_profile">
        <Image src="/images/profile/profile06.png" alt="profile" width={40} height={40} />
        <span className="me_16_20">김상훈</span>
      </div>
      <hr className="my_panel_divider" />
      <div className="my_panel_points">
        <Image src="/icons/point.png" alt="point" width={24} height={24} />
        <span className="me_20_24">23,000P</span>
      </div>
      <hr className="my_panel_divider" />
      <div className="my_panel_list">
        <div className="my_panel_item r_16_24">거래내역&북마크</div>
        <div className="my_panel_item r_16_24">포인트 사용 내역</div>
        <div className="my_panel_item r_16_24">비밀번호 변경</div>
      </div>
    </div>
  );
}
