"use client";
import { useState } from "react";
import styles from "./styles.module.css";

type TabType = "all" | "charge" | "purchase" | "sales";

export default function PointHistory() {
  const [selectedTab, setSelectedTab] = useState<TabType>("all");

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${styles.tabButtonSmall} ${
            selectedTab === "all" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("all")}
        >
          전체
        </button>
        <button
          className={`${styles.tabButton} ${styles.tabButtonLarge} ${
            selectedTab === "charge" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("charge")}
        >
          충전내역
        </button>
        <button
          className={`${styles.tabButton} ${styles.tabButtonLarge} ${
            selectedTab === "purchase" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("purchase")}
        >
          구매내역
        </button>
        <button
          className={`${styles.tabButton} ${styles.tabButtonLarge} ${
            selectedTab === "sales" ? styles.tabButtonActive : ""
          }`}
          onClick={() => handleTabClick("sales")}
        >
          판매내역
        </button>
      </div>
      <div className={styles.gap1}></div>
      <div className={styles.listArea}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div className={styles.headerDate}>
              <span>날짜</span>
            </div>
            <div className={styles.headerContent}>
              <span>내용</span>
            </div>
            <div className={styles.headerTransaction}>
              <span>거래 및 충전 내역</span>
            </div>
            <div className={styles.headerBalance}>
              <span>잔액</span>
            </div>
          </div>
          <div className={styles.tableBody}>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeCharge}>충전</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typePurchase}>구매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountNegative}>-50,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeSales}>판매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeCharge}>충전</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeCharge}>충전</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typePurchase}>구매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountNegative}>-50,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeSales}>판매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typeSales}>판매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountPositive}>+1,000,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
            <div className={styles.tableRow}>
              <div className={styles.cellDate}>
                <span>2024.12.16</span>
              </div>
              <div className={styles.cellContent}>
                <span className={styles.typePurchase}>구매</span>
              </div>
              <div className={styles.cellTransaction}>
                <span className={styles.amountNegative}>-50,000</span>
              </div>
              <div className={styles.cellBalance}>
                <span>1,222,000</span>
              </div>
            </div>
          </div>
          <div className={styles.pagination}>
            <div className={styles.paginationWrapper}>
              <button className={`${styles.pageButton} ${styles.pageButtonActive}`}>
                1
              </button>
              <button className={styles.pageButton}>2</button>
              <button className={styles.pageButton}>3</button>
              <button className={styles.pageButton}>4</button>
              <button className={styles.pageButton}>5</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gap2}></div>
    </div>
  );
}
