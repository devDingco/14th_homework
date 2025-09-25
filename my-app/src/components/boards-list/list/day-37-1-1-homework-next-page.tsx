// components/KamakuraBuddha.tsx
import React from "react";
import Image from "next/image";

const KamakuraBuddha: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      {/* 헤더 섹션 - 원본 이미지의 텍스트 구조 반영 */}
      <header className="max-w-4xl mx-auto mb-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          회원가입
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </p>

          <div className="space-y-3 text-gray-600">
            <div>
              <span className="font-medium">이메일</span>
              <p>codecamp@letsdingco.com</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">이름</span>
                <p>코드캠프</p>
              </div>

              <div>
                <span className="font-medium">비밀번호</span>
                <p>***********</p>
              </div>

              <div>
                <span className="font-medium">비밀번호 확인</span>
                <p>***********</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <h2 className="text-2xl font-bold text-center text-gray-800">
          회원가입
        </h2>
      </header>

      {/* 가마쿠라 대불 섹션 */}
      <main className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Kamakura_Daibutsu_2021.jpg/800px-Kamakura_Daibutsu_2021.jpg"
              alt="가마쿠라 대불 - 일본 가나가와현 가마쿠라 코토쿠인의 아미타불 입상"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              가마쿠라 대불 (Kamakura Daibutsu)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold text-lg mb-2">📍 위치 정보</h4>
                <ul className="space-y-2">
                  <li>∙ 국가: 일본</li>
                  <li>∙ 지역: 가나가와현 가마쿠라시</li>
                  <li>∙ 사원: 코토쿠인 (高徳院)</li>
                  <li>∙ 종교: 불교 (정토종)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">📏 규모 정보</h4>
                <ul className="space-y-2">
                  <li>∙ 높이: 약 13.35미터</li>
                  <li>∙ 무게: 약 121톤</li>
                  <li>∙ 제작 시대: 1252년 (카마쿠라 시대)</li>
                  <li>∙ 재료: 청동</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                ℹ️ 역사적 의미
              </h4>
              <p className="text-blue-700">
                가마쿠라 대불은 일본을 대표하는 불상 중 하나로, 원래는 목조 건물
                안에 있었으나 쓰나미로 인해 파괴된 후 현재는 노천에 안치되어
                있습니다. 가마쿠라 시대 불교 조각의 정수를 보여주는 걸작입니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="max-w-4xl mx-auto mt-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2024 회원기업. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default KamakuraBuddha;
