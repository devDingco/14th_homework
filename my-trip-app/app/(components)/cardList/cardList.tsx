"use client";

import "./cardList.css";
import "../../global.css";
import { mocksData } from "../../common/utils/mocks-data";
import Image from "next/image";
import Icon from "@utils/iconColor";
import Link from "next/link";
export default function CardList() {

  return(
    <div className="cardList_container">
      <h1 className="b_28_36">오늘 핫한 트립토크</h1>
      <div className="cardList_item_container">
        {mocksData.tripTalkMockData.map((item) => (
          <Link href={`/board/${item.id}`} key={item.id} className="cardList_item_link">
            <div className="cardList_item">
              <Image
                src={item.coverImage}
                alt={item.title}
                width={112}
                height={152}
              />
              <div className="cardList_item_content_container">
              <div className="cardList_item_content">
                <h2 className="b_16_24">{item.title}</h2>
                <div className="cardList_item_author_container">
                  <Image
                    src={item.authorProfileImage}
                    alt={item.authorName}
                    width={24}
                    height={24}
                  />
                  <p className="l_14_20 author_name" >{item.authorName}</p>
                </div>
                </div>
                <div className="cardList_item_bottom_container">
                  <p className="like_count r_14_20"
                    ><Icon outline name="good" red className="good_icon"/> {item.likeCount}</p>
                  <p className="r_14_20">{item.createdAt}</p>
                </div>
              </div>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}