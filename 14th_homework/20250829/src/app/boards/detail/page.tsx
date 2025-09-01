'use client';

import React from "react";
import Image from "next/image";

export default function BoardsDetail() {
  const postContent = `살겠노라 살겠노라. 청산에 살겠노라.
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
얄리얄리 얄라셩 얄라리 얄라`;

  const renderContentWithBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 leading-snug">
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </h1>
        <div className="flex items-center text-gray-500 text-sm">
          <Image
            src="/images/profile_img.png"
            alt="프로필"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="mr-4">전동철</span>
          <span>2024.11.11</span>
        </div>
      </div>

      {/* ✅ 본문 */}
      <div className="mb-6">
        <Image
          src="/images/beach.png"
          alt="바다 풍경"
          width={384} // 예시: 실제 이미지 가로 폭
          height={216} // 예시: 실제 이미지 세로 높이
          className="rounded-md mb-4"
        />
        <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
          {renderContentWithBreaks(postContent)}
        </div>
      </div>

      {/* ✅ 비디오 섹션 */}
      <div className="relative mb-6">
        <Image
          src="/images/video_img.jpg"
          alt="영상"
          width={768} // 예시
          height={432} // 예시
          className="rounded-md"
        />
        <Image
          src="/images/play_button.png"
          alt="재생 버튼"
          width={48}
          height={48}
          className="absolute inset-0 m-auto w-12 h-12 cursor-pointer"
        />
      </div>

      {/* ✅ 푸터 */}
      <div className="flex justify-between items-center border-t pt-4">
        {/* 좋아요/싫어요 */}
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1">
            <Image
              src="/images/good.png"
              alt="좋아요"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>24</span>
          </div>
          <div className="flex items-center space-x-1">
            <Image
              src="/images/bad.png"
              alt="싫어요"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>12</span>
          </div>
        </div>

        {/* 목록 / 수정 */}
        <div className="flex space-x-4">
          <button className="flex items-center border px-3 py-1 rounded">
            <Image
              src="/images/list.png"
              alt="목록"
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            목록으로
          </button>
          <button className="flex items-center border px-3 py-1 rounded">
            <Image
              src="/images/edit_pen.png"
              alt="수정"
              width={20}
              height={20}
              className="w-5 h-5 mr-1"
            />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
