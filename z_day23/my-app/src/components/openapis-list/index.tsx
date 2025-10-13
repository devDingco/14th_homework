"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useOpenapisList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";

export default function OpenapisList() {
  const { images, loading, error, hasMore, fetchMoreImages, handleImageError } =
    useOpenapisList();

  return (
    <div className={styles.container}>
      <h2>강아지들</h2>

      {loading && images.length === 0 ? (
        <div className={styles.loadingMessage}>
          강아지 이미지를 불러오는 중입니다...
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreImages}
          hasMore={hasMore}
          loader={<div className={styles.loadingMessage}>로딩중입니다...</div>}
          endMessage={
            <p className={styles.endMessage}>
              <b>더 이상 불러올 이미지가 없습니다.</b>
            </p>
          }
        >
          <div className={styles.imageGrid}>
            {images.map((url, index) => (
              <div key={index} className={styles.imageItem}>
                <Image
                  src={url}
                  alt={`Random dog image ${index + 1}`}
                  width={300}
                  height={300}
                  className={styles.dogImage}
                  onError={() => handleImageError(url)}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
