"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export default function SearchBar({ onChangeKeyword }) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.seachBarEnroll}>
          <div className={styles.seachBarEnroll__left}>
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
            <div className={styles.seachBar}>
              <Image
                src="/icons/outline/search.svg"
                alt="writeIcon"
                width={24}
                height={24}
                sizes="100vw"
              />
              <input
                className={styles.seachBar__input}
                onChange={onChangeKeyword}
                placeholder="제목을 검색해주세요. "
              />
            </div>
            <button className={styles.seachBarButton}>검색</button>
          </div>
          <button className={styles.submitButton}>
            <Image
              src="/icons/outline/whitewrite.svg"
              alt="writeIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
            트립토크 등록
          </button>
        </div>
      </div>
    </>
  );
}
