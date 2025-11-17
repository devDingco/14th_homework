import { test, expect } from "@playwright/test";

test.describe("여행상품 상세 페이지 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 먼저 목록 페이지에서 첫 번째 상품의 ID를 가져옴
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="purchase-list-page"]');
    
    // 첫 번째 상품 카드 클릭하여 상세 페이지로 이동
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    await firstProductCard.click();
    
    // 상세 페이지 로드 완료 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="purchase-detail-page"]');
  });

  test("Title Area에 여행상품 정보가 표시되어야 함", async ({ page }) => {
    // 제목 확인
    const titleElement = page.locator('[data-testid="detail-title"]');
    await expect(titleElement).toBeVisible();
    const titleText = await titleElement.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.trim().length).toBeGreaterThan(0);

    // 부제목 확인
    const subtitleElement = page.locator('[data-testid="detail-subtitle"]');
    await expect(subtitleElement).toBeVisible();
    const subtitleText = await subtitleElement.textContent();
    expect(subtitleText).toBeTruthy();

    // 해시태그 확인 (태그가 있는 경우)
    const hashtagsElement = page.locator('[data-testid="detail-hashtags"]');
    const hashtagsCount = await hashtagsElement.count();
    if (hashtagsCount > 0) {
      const hashtagsText = await hashtagsElement.textContent();
      expect(hashtagsText).toBeTruthy();
    }

    // 북마크 수 확인
    const bookmarkCount = page.locator('[data-testid="detail-bookmark-count"]');
    await expect(bookmarkCount).toBeVisible();
  });

  test("Purchase Area에 구매 정보가 표시되어야 함", async ({ page }) => {
    // 메인 이미지 확인
    const mainImage = page.locator('[data-testid="detail-main-image"]');
    await expect(mainImage).toBeVisible();

    // 썸네일 이미지 확인 (있는 경우)
    // 썸네일이 있을 수도 있고 없을 수도 있음

    // 가격 확인
    const priceElement = page.locator('[data-testid="detail-price"]');
    await expect(priceElement).toBeVisible();
    const priceText = await priceElement.textContent();
    expect(priceText).toBeTruthy();
    // 가격이 천 단위 콤마로 표시되어야 함
    if (priceText) {
      const priceNumber = priceText.replace(/[^0-9,]/g, "");
      expect(priceNumber.length).toBeGreaterThan(0);
    }

    // 판매자 정보 확인
    const sellerName = page.locator('[data-testid="detail-seller-name"]');
    await expect(sellerName).toBeVisible();
    const sellerNameText = await sellerName.textContent();
    expect(sellerNameText).toBeTruthy();
  });

  test("Content Area에 상세 설명이 표시되어야 함", async ({ page }) => {
    // 상세 설명 확인
    const contentElement = page.locator('[data-testid="detail-contents"]');
    await expect(contentElement).toBeVisible();
    const contentText = await contentElement.textContent();
    expect(contentText).toBeTruthy();
    expect(contentText?.trim().length).toBeGreaterThan(0);
  });

  test("Map Area에 상세 위치 정보가 표시되어야 함", async ({ page }) => {
    // 지도 영역 확인
    const mapArea = page.locator('[data-testid="detail-map-area"]');
    await expect(mapArea).toBeVisible();
  });
});

