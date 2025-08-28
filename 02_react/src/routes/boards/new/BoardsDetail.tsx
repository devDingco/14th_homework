import img1 from './../../../assets/images/bf8d80f3268fd56c18f3d708b2130bf315ff5ef8.jpg';
import video1 from './../../../assets/images/54a36b7f016934c8179e2369db49c7bb1ef8a9e2.jpg';

import {
  Ioutline_bad,
  Ioutline_edit,
  Ioutline_good,
  Ioutline_menu,
} from '../../../assets/icons/icons';

export default function BoardsDetail() {
  return (
    <section className='h-full w-full flex  justify-center flex-col items-center gap-10 py-10'>
      <main className='w-full flex flex-col gap-6 p-16px h-full w-full max-w-7xl'>
        <header className='h-18 text-2xl'>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </header>

        {/* ===== 2 ===== */}
        <div className='flex flex-col gap-4'>
          <div className='w-full justify-between flex'>
            <div>
              <span>profile icon</span>
              <span>홍길동</span>
            </div>
            <span>2024.11.11</span>
          </div>

          <hr className='inline-block h-1 my-4' />

          <div className='flex justify-end gap-2'>
            <span>link</span>
            <span>location</span>
          </div>
        </div>

        {/* ===== 3 이미지 ===== */}
        <div>
          <img className='max-w-100' src={img1} alt='' />
        </div>

        {/* ===== 4 텍스트 ===== */}
        <p className='whitespace-pre'>
          {`
살겠노라 살겠노라. 청산에 살겠노라.
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
얄리얄리 얄라셩 얄라리 얄라
          `}
        </p>

        {/* ===== 5 비디오 ===== */}
        <div className='flex justify-center'>
          <img className='max-w-[822px]' src={video1}></img>
        </div>

        {/* ===== 6 아이콘 ===== */}
        <div className='flex justify-center'>
          <div className='flex gap-6'>
            {/* heart - bad */}
            <div className='flex flex-col gap-1  justify-center items-center'>
              <img className='w-6 h-6' src={Ioutline_bad} alt='outline_bad' />
              <div>24</div>
            </div>
            {/* heart - good */}
            <div className='flex flex-col gap-1  justify-center items-center text-red-500'>
              <img className='w-6 h-6' src={Ioutline_good} alt='outline_good' />
              <div>12</div>
            </div>
          </div>
        </div>

        {/* ===== 6 버튼 ===== */}
        <div className='flex justify-center text-xs'>
          <div className='flex gap-6'>
            <button className='flex gap-2 w-[105px] h-10 items-center px-2 py-3 border rounded-lg line-he'>
              <img src={Ioutline_menu}></img>
              <span>목록으로</span>
            </button>
            <button className='flex gap-2 w-[105px] h-10 items-center px-2 py-3 border rounded-lg line-he'>
              <img src={Ioutline_edit}></img>
              <span>수정하기</span>
            </button>
          </div>
        </div>
        {/* </div> */}
      </main>
    </section>
  );
}
