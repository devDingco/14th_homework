"use client";

import { useState } from "react";
import Image from "next/image";

export default function PostCreatePage() {
  const [studentName, setStudentName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ studentName, content });
    alert("제출되었습니다!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">2024.11.11</h1>
          <p className="text-lg whitespace-pre-wrap leading-relaxed">
            {`살어리 살어리랏다 쳥산(青山)애 살어리랏다멀위랑 도래랑 먹고 쳥산(青山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라`}
          </p>
          <div className="flex justify-between items-center mt-4 text-blue-100">
            <span>2024.11.11</span>
            <span>올림 9:15</span>
          </div>
        </div>

        {/* 아이콘 및 주소 */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📍</span>
            </div>
            <span>tocathom 'location'아이콘 호버 시 tooltip 노출</span>
          </div>
          <p className="ml-9 text-gray-600">
            서울 특별시 강남구 신논현로 111-6
          </p>
        </div>

        {/* 시 내용 섹션 */}
        <div className="p-8 bg-white">
          <div className="space-y-4 text-gray-800 leading-relaxed">
            {[
              "살겠노라 살겠노라. 청산에 살겠노라.,",
              "머루랑 다래를 먹고 청산에 살겠노라.,",
              "얄리얄리 얄랑셩 얄라리 얄라",
              "",
              "우는구나 우는구나 새야. 자고 일어나 우는구나 새야.,",
              "너보다 시름 많은 나도 자고 일어나 우노라.,",
              "알리알리 얄라셩 얄라리 얄라",
              "",
              "갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐",
              "이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.,",
              "얄리얄리 얄라셩 얄라리 얄라",
              "",
              "이럭저럭 하여 낮일랑 지내 왔건만",
              "미워할 이도 사랑할 이도 없이 맞아서 우노라.,",
              "얄리얄리 얄라셩 얄라리 얄라",
              "",
              "아디다 던지는 돌인가 누굴를 맞히려던 돌인가.,",
              "미워할 이도 사랑할 이도 없이 맞아서 우노라.",
              "얄리얄리 얄라셩 얄라리 얄라",
              "",
              "살겠노라 살겠노라. 바다에 살겠노라.,",
              "나문재, 굴, 조개를 먹고 바다에 살겠노라.,",
              "얄리얄리 얄라셩 얄라리 얄라",
              "",
              "가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.,",
              "사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.,",
              "얄리얄리 얄라셩 얄라리 얄라",
              "",
              "가다 보니 배불룩한 술독에 독한 술을 빚는구나.,",
              "조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까., [1]",
              "얄리얄리 얄라셩 얄라리 얄라",
            ].map((line, index) => (
              <p key={index} className={line === "" ? "h-4" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* 바닷가 의자 사진 */}
        <div className="relative h-80 w-full">
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="바닷가의 두 의자"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 폼 섹션 */}
        <div className="p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">오픈</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 작성자 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                학생자 *
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="작성자 명을 입력해 주세요."
                required
              />
            </div>

            {/* 내용 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                비밀번호를 입력해 주세요.
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-all duration-200"
                placeholder="댓글을 입력해 주세요..."
                required
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              제출하기
            </button>
          </form>
        </div>

        {/* 아늑한 소파 사진 */}
        <div className="relative h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="아늑한 갈색 소파"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
