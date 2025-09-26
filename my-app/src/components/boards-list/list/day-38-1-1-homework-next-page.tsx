// pages/my-page/index.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "./my-page-styles.css";

// 타입 정의
interface User {
  name: string;
  point: number;
  avatar: string;
}

interface Transaction {
  id: number;
  date: string;
  productName: string;
  amount: number;
  balance: number;
  type: "charge" | "purchase" | "sale";
}

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "charge" | "purchase" | "sale"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 새로고침 시 로그인 유지 확인
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("userData");

      if (!token || !userData) {
        // 인가되지 않은 사용자 접근 처리
        router.push("/login");
        return;
      }

      try {
        const user = JSON.parse(userData);
        setUser(user);
        loadTransactions();
      } catch (error) {
        console.error("유저 데이터 파싱 오류:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  // 거래내역 로드 함수
  const loadTransactions = () => {
    // 임시 데이터 - 실제로는 API 호출
    const mockTransactions: Transaction[] = [
      {
        id: 1,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 2,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 3,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 4,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 5,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 6,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 7,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
      {
        id: 8,
        date: "2024.12.16",
        productName: "파르나스 호텔 제주",
        amount: 1000000,
        balance: 1222000,
        type: "charge",
      },
    ];
    setTransactions(mockTransactions);
  };

  // 탭별 필터링된 거래내역
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    return transaction.type === activeTab;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  // 인가되지 않은 사용자 접근 시 로딩 화면
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>접근 권한을 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="my-page-container">
      {/* 헤더 네비게이션 */}
      <header className="header">
        <div className="header-top">
          <h1 className="logo">TRiP TRiP</h1>
          <nav className="nav-menu">
            <button className="nav-item">트립토크</button>
            <button className="nav-item">숙박권 구매</button>
            <button className="nav-item active">마이 페이지</button>
          </nav>
        </div>
      </header>

      {/* 마이페이지 컨텐츠 */}
      <main className="main-content">
        {/* 사용자 정보 섹션 */}
        <section className="user-info-section">
          <h2 className="section-title">마이 페이지</h2>
          <div className="user-card">
            <div className="user-avatar">
              <span className="avatar-emoji">👩</span>
            </div>
            <div className="user-details">
              <div className="user-name">
                <strong>📌 {user.name}</strong>
              </div>
              <div className="user-point">
                <span className="point-label">📍</span>
                <strong className="point-amount">
                  {user.point.toLocaleString()} P
                </strong>
              </div>
            </div>
          </div>

          {/* 기능 메뉴 */}
          <div className="function-menu">
            <button className="menu-item">거래내역홈페이지</button>
            <button className="menu-item">포인트 사용 내역</button>
            <button className="menu-item">비밀번호 변경</button>
            <button className="menu-item logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </section>

        {/* 거래내역 섹션 */}
        <section className="transaction-section">
          <div className="section-header">
            <h3 className="section-subtitle">포인트 사용 내역</h3>

            {/* 탭 메뉴 */}
            <div className="tab-menu">
              <button
                className={`tab-item ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                전체
              </button>
              <button
                className={`tab-item ${activeTab === "charge" ? "active" : ""}`}
                onClick={() => setActiveTab("charge")}
              >
                충전내역
              </button>
              <button
                className={`tab-item ${
                  activeTab === "purchase" ? "active" : ""
                }`}
                onClick={() => setActiveTab("purchase")}
              >
                구매내역
              </button>
              <button
                className={`tab-item ${activeTab === "sale" ? "active" : ""}`}
                onClick={() => setActiveTab("sale")}
              >
                판매내역
              </button>
            </div>
          </div>

          {/* 거래내역 테이블 */}
          <div className="transaction-table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>거래일</th>
                  <th>상품 명</th>
                  <th>거래내역</th>
                  <th>거래 후 잔액</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.productName}</td>
                    <td
                      className={`amount ${
                        transaction.amount > 0 ? "positive" : "negative"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()}
                    </td>
                    <td>{transaction.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// 로그인 페이지 컴포넌트 (예시)
export function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 성공 시
    const userData = {
      name: "김상훈",
      point: 23000,
      avatar: "👩",
    };

    localStorage.setItem("accessToken", "mock-access-token");
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/my-page");
  };

  return (
    <div className="login-container">
      <h1>TRiP TRiP 로그인</h1>
      <button onClick={handleLogin}>로그인하기</button>
    </div>
  );
}

// 인가 HOC (Higher Order Component)
export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
    }, [router]);

    if (isAuthenticated === null) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>접근 권한을 확인 중입니다...</p>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// 보호된 페이지 래퍼
export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/login");
      }
    };

    checkAuthorization();
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>접근 권한을 확인 중입니다...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
