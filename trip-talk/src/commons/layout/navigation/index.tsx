"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import PointChargeModal from "@/components/point_payment/PointChargeModal";
import PaymentMethodModal from "@/components/point_payment/PaymentMethodModal";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
      picture
    }
  }
`;
export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [login, setLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPointChargeModalOpen, setIsPointChargeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (data) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [data]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const onClickMove = () => {
    router.push("/");
  };
  const onClickBoard = () => {
    router.push("/boards");
  };
  const onClickMypage = () => {
    router.push("/mypage");
  };
  const onClickAccommodation = () => {
    router.push("/accommodation");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePointCharge = () => {
    setIsPointChargeModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleProfileRegister = () => {
    // TODO: 프로필 등록 페이지로 이동 또는 모달 열기
    console.log("프로필 등록");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // 로그아웃 로직 추가
    console.log("로그아웃");
    setIsDropdownOpen(false);
  };

  const handlePointChargeModalClose = () => {
    setIsPointChargeModalOpen(false);
  };

  const handleConfirmAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsPointChargeModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSelectPayment = async (method: "kakaopay" | "nicepay") => {
    console.log(`결제 수단: ${method}, 금액: ${selectedAmount}원`);

    // 여기에 실제 결제 API 호출 로직 추가
    if (method === "kakaopay") {
      console.log("카카오페이 결제 시작");
      // 카카오페이 결제 API 호출
    } else if (method === "nicepay") {
      console.log("나이스페이 결제 시작");
      // 나이스페이 결제 API 호출
    }

    setIsPaymentModalOpen(false);
  };
  return (
    <>
      <div className={styles.네비게이션}>
        <div className={styles.페이지선택}>
          <Image
            src={"/images/logo.png"}
            alt="로고"
            width={51.52}
            height={32}
            onClick={onClickMove}
          />
          <div
            onClick={onClickBoard}
            className={`${styles.탭} ${
              pathname?.startsWith("/boards") ? styles.활성탭 : ""
            }`}
          >
            트립토크
          </div>
          <div
            onClick={onClickAccommodation}
            className={`${styles.탭} ${
              pathname?.startsWith("/accommodation") ? styles.활성탭 : ""
            }`}
          >
            숙박권 구매
          </div>
          <div
            onClick={onClickMypage}
            className={`${styles.탭} ${
              pathname?.startsWith("/mypage") ? styles.활성탭 : ""
            }`}
          >
            마이페이지
          </div>
        </div>
        <Image
          src={"/images/button_login.png"}
          alt="로그인"
          width={93}
          height={40}
          className={`${styles.login} ${login ? "" : styles.show}`}
          onClick={onClickMove}
        />
        <div
          className={`${styles.프로필컨테이너} ${login ? styles.show : ""}`}
          ref={dropdownRef}
        >
          <div className={`${styles.프로필}`} onClick={toggleDropdown}>
            <Image
              src={"/images/profile.png"}
              alt="프로필"
              width={40}
              height={40}
            />
            <Image
              src={"/images/down_arrow.png"}
              alt="드롭다운"
              width={24}
              height={24}
              className={isDropdownOpen ? styles.회전 : ""}
            />
          </div>

          {isDropdownOpen && (
            <div className={styles.드롭다운메뉴}>
              <div
                className={styles.드롭다운아이템}
                onClick={handlePointCharge}
              >
                포인트 충전
              </div>
              <div
                className={styles.드롭다운아이템}
                onClick={handleProfileRegister}
              >
                프로필 등록
              </div>
              <div className={styles.드롭다운아이템} onClick={handleLogout}>
                로그아웃
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 포인트 충전 모달 */}
      <PointChargeModal
        isOpen={isPointChargeModalOpen}
        onClose={handlePointChargeModalClose}
        onConfirm={handleConfirmAmount}
      />

      {/* 결제 수단 선택 모달 */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        amount={selectedAmount}
        onClose={handlePaymentModalClose}
        onSelectPayment={handleSelectPayment}
      />
    </>
  );
}
