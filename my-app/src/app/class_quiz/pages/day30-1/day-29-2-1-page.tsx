// day29-layout-carousel.tsx
import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import "./day29-styles.css";

// ============================================================================
// 1. Layout 컴포넌트
// ============================================================================

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const currentPath = router.pathname;

  // 특정 경로에서 영역 숨기기 조건 설정
  const hideNavigation =
    currentPath === "/14/one" ||
    currentPath === "/14/two" ||
    currentPath.startsWith("/14/");

  const hideSidebar =
    currentPath === "/14/two" || currentPath.startsWith("/14/");

  const hideBanner =
    currentPath === "/14/two" || currentPath.startsWith("/14/");

  const hideFooter = currentPath.startsWith("/14/");

  return (
    <div className="layout-container">
      {/* 헤더 영역 */}
      <header className="layout-header">헤더 영역</header>

      {/* 배너 영역 */}
      {!hideBanner && <div className="layout-banner">배너 영역</div>}

      <div className="layout-mainContent">
        {/* 네비게이션 영역 */}
        {!hideNavigation && (
          <nav className="layout-navigation">네비게이션 영역</nav>
        )}

        {/* 사이드바 영역 */}
        {!hideSidebar && (
          <aside className="layout-sidebar">사이드바 영역</aside>
        )}

        {/* 바디 영역 */}
        <main className="layout-body">{children}</main>
      </div>

      {/* 푸터 영역 */}
      {!hideFooter && <footer className="layout-footer">푸터 영역</footer>}
    </div>
  );
}

// ============================================================================
// 2. Carousel 컴포넌트
// ============================================================================

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

function Carousel({ images, autoPlay = true, interval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 자동 재생 효과
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-container">
        <button
          className="carousel-prevButton"
          onClick={prevSlide}
          aria-label="이전 이미지"
        >
          ‹
        </button>

        <div className="carousel-slideContainer">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "carousel-slide-active" : ""
              }`}
              style={{
                backgroundImage: `url(${image})`,
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            />
          ))}
        </div>

        <button
          className="carousel-nextButton"
          onClick={nextSlide}
          aria-label="다음 이미지"
        >
          ›
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${
              index === currentIndex ? "carousel-indicator-active" : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}번 이미지로 이동`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 3. 페이지 컴포넌트들
// ============================================================================

// One 페이지
export function OnePage() {
  return (
    <Layout>
      <h1>One 페이지</h1>
      <p>이 페이지는 네비게이션 영역이 숨겨집니다.</p>
    </Layout>
  );
}

// Two 페이지
export function TwoPage() {
  return (
    <Layout>
      <h1>Two 페이지</h1>
      <p>이 페이지는 사이드바, 배너, 네비게이션 영역이 숨겨집니다.</p>
    </Layout>
  );
}

// 동적 페이지
export function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <h1>동적 페이지 - ID: {id}</h1>
      <p>
        이 페이지는 사이드바, 배너, 네비게이션, 푸터 영역이 모두 숨겨집니다.
      </p>
    </Layout>
  );
}

// 캐러셀 데모 페이지
const sampleImages = [
  "https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Image+1",
  "https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=Image+2",
  "https://via.placeholder.com/800x400/45B7D1/FFFFFF?text=Image+3",
  "https://via.placeholder.com/800x400/96CEB4/FFFFFF?text=Image+4",
  "https://via.placeholder.com/800x400/F7DC6F/FFFFFF?text=Image+5",
];

export function CarouselPage() {
  return (
    <Layout>
      <h1>직접 만든 캐러셀</h1>
      <Carousel images={sampleImages} autoPlay={true} interval={3000} />

      <div style={{ marginTop: "2rem" }}>
        <h2>캐러셀 기능 설명</h2>
        <ul>
          <li>좌우 화살표 버튼으로 이미지 이동</li>
          <li>하단 인디케이터로 특정 이미지 바로 이동</li>
          <li>자동 재생 기능 (3초 간격)</li>
          <li>반응형 디자인</li>
          <li>부드러운 전환 효과</li>
        </ul>
      </div>
    </Layout>
  );
}

// ============================================================================
// 4. 메인 데모 컴포넌트 (모든 기능을 한번에 보여주는 페이지)
// ============================================================================

export default function Day29DemoPage() {
  const [currentView, setCurrentView] = useState<
    "one" | "two" | "carousel" | "dynamic"
  >("carousel");

  const renderContent = () => {
    switch (currentView) {
      case "one":
        return <OnePage />;
      case "two":
        return <TwoPage />;
      case "carousel":
        return <CarouselPage />;
      case "dynamic":
        return <DynamicPage />;
      default:
        return <CarouselPage />;
    }
  };

  return (
    <div>
      {/* 네비게이션 컨트롤 */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          marginBottom: "1rem",
        }}
      >
        <h2>Day 29 데모 페이지</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => setCurrentView("one")}>One 페이지 보기</button>
          <button onClick={() => setCurrentView("two")}>Two 페이지 보기</button>
          <button onClick={() => setCurrentView("carousel")}>
            캐러셀 데모
          </button>
          <button onClick={() => setCurrentView("dynamic")}>
            동적 페이지 (ID: 123)
          </button>
        </div>
      </div>

      {/* 현재 선택된 뷰 렌더링 */}
      {renderContent()}
    </div>
  );
}

// ============================================================================
// Next.js 페이지 라우팅을 위한 설정
// ============================================================================

// 각 페이지별 컴포넌트 export
export { Layout, Carousel, OnePage, TwoPage, DynamicPage, CarouselPage };
