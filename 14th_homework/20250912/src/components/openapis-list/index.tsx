"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserList } from "./hook";
import styles from "./styles.module.css";
import { User } from "./types";

export default function OpenApiList() {
  const { users, isLoading, hasMore, error, fetchMore } = useUserList();

  console.log(`렌더링: users=${users.length}, isLoading=${isLoading}, hasMore=${hasMore}`);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>에러 발생: {error}</p>
        <button className={styles.retryButton} onClick={fetchMore}>
          재시도
        </button>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={users.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<div className={styles.loader}>로딩 중...</div>}
      endMessage={<p className={styles.endMessage}>모든 사용자를 불러왔습니다!</p>}
      scrollThreshold={0.9} // 화면 하단 90%에서 로드
    >
      <div className={styles.grid}>
        {users.map((user: User, index: number) => (
          <div key={`${user.login.uuid}-${index}`} className={styles.card}>
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.cardContent}>
              <h3 className={styles.name}>
                {user.name.first} {user.name.last}
              </h3>
              <p className={styles.nat}>국적: {user.nat}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}