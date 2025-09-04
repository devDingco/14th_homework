"use client";

import "./cardList.css";
import "../../global.css";
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

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await fetchBoardsOfTheBestApi();
        if (!isMounted) return;
        setBoards(Array.isArray(result) ? result : []);
      } catch {
        if (!isMounted) return;
        setError("데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return(
    <div className="cardList_container">
      <h1 className="b_28_36">오늘 핫한 트립토크</h1>
      <div className="cardList_item_container">
        {error && (
          <p className="r_14_20" style={{ color: "var(--red-50)" }}>{error}</p>
        )}
        {!error && boards.length === 0 && (
          <p className="r_14_20">표시할 게시글이 없습니다.</p>
        )}
        {boards.map((item, index) => (
          <Link href={`/board/${item._id}`} key={item._id} className="cardList_item_link">            <div className="cardList_item">
              <Image
                src={(item.images?.[0] && (item.images[0]!.startsWith("http") ? item.images[0]! : `https://storage.googleapis.com/${item.images[0]}`)) || "/images/desktop/a.png"}
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