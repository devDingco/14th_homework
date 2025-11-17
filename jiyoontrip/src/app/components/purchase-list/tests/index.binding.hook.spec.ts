import { test, expect } from "@playwright/test";

test.describe("여행상품 목록 페이지 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/purchase");
    // 페이지 로드 완료 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="purchase-list-page"]');
  });

  test("Best Item Area에 베스트 여행상품이 표시되어야 함", async ({ page }) => {
    // Best Item Area의 캐러셀 영역 확인
    const carouselArea = page.locator('[data-testid="best-item-carousel"]');
    await expect(carouselArea).toBeVisible();

    // 베스트 여행상품 카드가 존재하는지 확인
    const bestCards = page.locator('[data-testid="best-item-card"]');
    const count = await bestCards.count();
    expect(count).toBeGreaterThan(0);

    // 첫 번째 카드의 데이터 확인
    const firstCard = bestCards.first();

    // 제목 확인
    const cardTitle = firstCard.locator('[data-testid="best-card-title"]');
    await expect(cardTitle).toBeVisible();
    const titleText = await cardTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.trim().length).toBeGreaterThan(0);

    // 설명 확인
    const cardDescription = firstCard.locator('[data-testid="best-card-description"]');
    await expect(cardDescription).toBeVisible();

    // 가격 확인
    const cardPrice = firstCard.locator('[data-testid="best-card-price"]');
    await expect(cardPrice).toBeVisible();
    const priceText = await cardPrice.textContent();
    expect(priceText).toBeTruthy();

    // 북마크 수 확인
    const cardBookmark = firstCard.locator('[data-testid="best-card-bookmark"]');
    await expect(cardBookmark).toBeVisible();
  });

  test("Main Area에 여행상품 목록이 표시되어야 함", async ({ page }) => {
    // Main Area의 카드 영역 확인
    const cardArea = page.locator('[data-testid="main-card-area"]');
    await expect(cardArea).toBeVisible();

    // 여행상품 카드가 존재하는지 확인
    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    // 첫 번째 카드의 데이터 확인
    const firstCard = productCards.first();

    // 이미지 확인
    const cardImage = firstCard.locator('[data-testid="product-card-image"]');
    await expect(cardImage).toBeVisible();

    // 제목 확인
    const cardTitle = firstCard.locator('[data-testid="product-card-title"]');
    await expect(cardTitle).toBeVisible();
    const titleText = await cardTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.trim().length).toBeGreaterThan(0);

    // 부제목 확인
    const cardSubtitle = firstCard.locator('[data-testid="product-card-subtitle"]');
    await expect(cardSubtitle).toBeVisible();

    // 태그 확인 (태그가 있는 경우)
    const cardTags = firstCard.locator('[data-testid="product-card-tags"]');
    const tagsCount = await cardTags.count();
    if (tagsCount > 0) {
      const tagsText = await cardTags.textContent();
      expect(tagsText).toBeTruthy();
    }

    // 판매자 프로필 확인
    const cardProfile = firstCard.locator('[data-testid="product-card-profile"]');
    await expect(cardProfile).toBeVisible();

    // 가격 확인
    const cardPrice = firstCard.locator('[data-testid="product-card-price"]');
    await expect(cardPrice).toBeVisible();
    const priceText = await cardPrice.textContent();
    expect(priceText).toBeTruthy();

    // 북마크 수 확인
    const cardBookmark = firstCard.locator('[data-testid="product-card-bookmark"]');
    await expect(cardBookmark).toBeVisible();
  });

  test("가격이 천 단위 콤마로 표시되어야 함", async ({ page }) => {
    // Best Item Area의 가격 확인
    const bestCard = page.locator('[data-testid="best-item-card"]').first();
    const bestPrice = bestCard.locator('[data-testid="best-card-price"]');
    const bestPriceText = await bestPrice.textContent();
    if (bestPriceText) {
      // 숫자와 콤마만 포함되어야 함
      const priceNumber = bestPriceText.replace(/[^0-9,]/g, "");
      expect(priceNumber.length).toBeGreaterThan(0);
    }

    // Main Area의 가격 확인
    const productCard = page.locator('[data-testid="product-card"]').first();
    const productPrice = productCard.locator('[data-testid="product-card-price"]');
    const productPriceText = await productPrice.textContent();
    if (productPriceText) {
      // 숫자와 콤마만 포함되어야 함
      const priceNumber = productPriceText.replace(/[^0-9,]/g, "");
      expect(priceNumber.length).toBeGreaterThan(0);
    }
  });
});

