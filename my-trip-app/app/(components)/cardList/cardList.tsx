"use client";

import "../../global.css";
import "./cardList.css";
import Image from "next/image";
import Icon from "@utils/iconColor";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BestBoard } from "@/_types/board";
import { fetchBoardsOfTheBestApi } from "@/commons/apis/home.api";
import { formatDate } from "@hooks/formatDate";

export default function CardList() {
  const [boards, setBoards] = useState<BestBoard[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        console.log('🚀 CardList: 데이터 로딩 시작 (로그인 상태 무관)');
        setLoading(true);
        const result = await fetchBoardsOfTheBestApi();
        if (!isMounted) return;
        
        console.log('📋 CardList: 받은 데이터:', result);
        console.log('📊 CardList: 데이터 타입:', typeof result, '배열인가?', Array.isArray(result));
        
        // API에서 이미 빈 배열을 반환하므로 안전하게 처리
        if (Array.isArray(result)) {
          setBoards(result);
          console.log('✅ CardList: 게시글 설정 완료, 개수:', result.length);
        } else {
          setBoards([]);
          console.log('⚠️ CardList: 배열이 아닌 데이터 받음, 빈 배열로 설정');
        }
        setError(""); // 성공 시 에러 상태 초기화
      } catch (err: any) {
        if (!isMounted) return;
        console.error("🚨 CardList fetch error:", err);
        
        // 인증 관련 에러인지 확인
        const isAuthError = err?.networkError?.statusCode === 401 || 
                           err?.graphQLErrors?.some((e: any) => e.extensions?.code === 'UNAUTHENTICATED');
        
        if (isAuthError) {
          console.log('🔓 인증 에러 감지, 공개 데이터로 재시도');
          // 인증 에러의 경우에도 빈 배열로 설정하여 UI가 정상 동작하도록 함
          setBoards([]);
          setError("");
        } else {
          // 다른 에러의 경우 에러 메시지 표시
          setBoards([]);
          setError("데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log('🏁 CardList: 로딩 완료');
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return(
    <div className="cardList_container">
      <h1 className="cardList_title b_28_36">오늘 핫한 트립토크</h1>
      <div className="cardList_item_container">
        {loading && (
          <p className="r_14_20">게시글을 불러오는 중...</p>
        )}
        {!loading && error && (
          <p className="r_14_20" style={{ color: "var(--red-50)" }}>{error}</p>
        )}
        {!loading && !error && boards.length === 0 && (
          <p className="r_14_20">아직 등록된 게시글이 없습니다.</p>
        )}
        {!loading && boards.map((item, index) => (
          <Link href={`/board/${item._id}`} key={item._id} className="cardList_item_link">           
           <div className="cardList_item">
              <Image
                src={(item.images?.[0] && (item.images[0]!.startsWith("http") ? item.images[0]! : `https://storage.googleapis.com/${item.images[0]!.startsWith("/") ? item.images[0]!.slice(1) : item.images[0]}`)) || "/images/desktop/a.png"}
                alt={item.title}
                width={112}
                height={152}
                style={{ borderRadius: "0.8rem" }}
              />
              <div className="cardList_item_content_container">
              <div className="cardList_item_content">
                <h2 className="b_16_24">{item.title}</h2>
                <div className="cardList_item_author_container">
                  <Image
                    src={"/images/desktop/b.png"}
                    alt={item.user?.name || item.writer || "author"}
                    width={24}
                    height={24}
                    style={{ borderRadius: "50%" }}
                  />
                  <p className="l_14_20 author_name" >{item.user?.name || item.writer || "익명"}</p>
                </div>
                </div>
                <div className="cardList_item_bottom_container">
                  <p className="like_count r_14_20"
                    ><Icon outline name="good" red className="good_icon"/> {item.likeCount ?? 0}</p>
                  <div className="date r_14_20">{formatDate(item.createdAt)}</div>
                </div>
              </div>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}