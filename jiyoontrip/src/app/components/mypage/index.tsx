"use client";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import MyInput from "@/app/commons/components/input";
import MyButton from "@/app/commons/components/button";
import Image from "next/image";
import { useState } from "react";

export default function Mypage() {
  const { register, formState } = useForm({ mode: "onChange" });
  const [activeTab, setActiveTab] = useState<"myProduct" | "bookmark">("myProduct");

  return (
    <div className={styles.container}>
      <div className={styles.gap}></div>

      <div className={styles.mypageLabel}>
        <h1 className={styles.title}>마이 페이지</h1>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.myprofile}>
        <div className={styles.userInfoBox}>
          <div className={styles.profileSection}>
            <div className={styles.profileImage}></div>
            <span className={styles.profileName}>김상훈</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.pointSection}>
            <Image src="/icons/outline/point.svg" alt="포인트" width={24} height={24} />
            <div className={styles.pointValue}>
              <span className={styles.pointNumber}>23,000</span>
              <span className={styles.pointUnit}>P</span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.menuSection}>
            <button className={`${styles.menuTab} ${styles.menuTabActive}`}>
              <span className={styles.menuTabText}>거래내역&북마크</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
            <button className={styles.menuTab}>
              <span className={styles.menuTabText}>포인트 사용 내역</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
            <button className={styles.menuTab}>
              <span className={styles.menuTabText}>비밀번호 변경</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.gap}></div>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.gap}></div>
    </div>
  );
}
