import Image from 'next/image';

export default function MyPanel() {
  return (
    <div>
      <div className="sb_18_24">내 정보</div>
      <div>
        <Image src="/images/profile/profile06.png" alt="profile" width={40} height={40} />
        <span className="me_16_20">김상훈</span>
      </div>
      <hr />
      <div>
        <Image src="/icons/point.png" alt="point" width={24} height={24} />
        <span className="me_20_24">23,000P</span>
      </div>
      <div>
        <div className="r_16_24">거래내역&북마크</div>
        <div className="r_16_24">포인트 사용 내역</div>
        <div className="r_16_24">비밀번호 변경</div>
      </div>
    </div>
  );
}
