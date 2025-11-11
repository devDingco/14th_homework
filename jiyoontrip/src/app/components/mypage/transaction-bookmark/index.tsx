"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import MyInput from "@/app/commons/components/input";
import MyButton from "@/app/commons/components/button";
import styles from "./styles.module.css";

export default function TransactionBookmark() {
  const { register, formState } = useForm({ mode: "onChange" });
  const [activeTab, setActiveTab] = useState<"myProduct" | "bookmark">("myProduct");

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "myProduct" ? styles.tabButtonActive : ""
          }`}
          onClick={() => setActiveTab("myProduct")}
        >
          나의 상품
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "bookmark" ? styles.tabButtonActive : ""
          }`}
          onClick={() => setActiveTab("bookmark")}
        >
          북마크
        </button>
      </div>
      <div className={styles.gapSmall}></div>
      <div className={styles.searchbar}>
        <form className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <Image
              src="/icons/outline/search.svg"
              alt="검색"
              width={24}
              height={24}
              className={styles.searchIcon}
            />
            <MyInput
              register={register}
              name="search"
              placeholder="필요한 내용을 검색해 주세요."
              style={{
                border: "none",
                backgroundColor: "#f2f2f2",
                padding: "12px 12px 12px 8px",
              }}
            />
          </div>
          <MyButton
            formState={formState}
            style={{
              backgroundColor: "#000000",
              width: "64px",
              height: "48px",
              padding: "12px 16px",
            }}
          >
            검색
          </MyButton>
        </form>
      </div>
      <div className={styles.gapSmall}></div>
      <div className={styles.listArea}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell} style={{ width: "64px" }}>
              번호
            </div>
            <div className={styles.tableHeaderCell} style={{ width: "848px" }}>
              상품 명
            </div>
            <div className={styles.tableHeaderCell} style={{ width: "100px" }}>
              판매가격
            </div>
            <div className={styles.tableHeaderCell} style={{ width: "100px" }}>
              날짜
            </div>
          </div>
          <div className={styles.tableBody}>
            {[...Array(10)].map((_, index) => {
              const isGray = index === 0 || index === 2 || index === 3;
              return (
                <div key={index} className={styles.tableRow}>
                  <div
                    className={styles.tableCell}
                    style={{ width: "64px", textAlign: "center" }}
                  >
                    <span className={styles.tableCellNumber}>243</span>
                  </div>
                  <div className={styles.tableCell} style={{ width: "848px" }}>
                    <span
                      className={
                        isGray ? styles.tableCellProductGray : styles.tableCellProduct
                      }
                    >
                      파르나스 호텔 제주
                    </span>
                    <span className={styles.tableCellStatus}>판매 완료</span>
                  </div>
                  <div
                    className={styles.tableCell}
                    style={{ width: "100px", textAlign: "center" }}
                  >
                    <span className={styles.tableCellPrice}>326,000원</span>
                  </div>
                  <div
                    className={styles.tableCell}
                    style={{ width: "100px", textAlign: "center" }}
                  >
                    <span className={styles.tableCellDate}>2024.12.16</span>
                  </div>
                  <button className={styles.deleteIconWrapper}>
                    <Image
                      src="/icons/outline/delete.svg"
                      alt="삭제"
                      width={24}
                      height={24}
                      className={styles.deleteIcon}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.gap}></div>
    </>
  );
}
