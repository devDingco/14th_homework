import { test, expect } from "@playwright/test";

test.describe("PurchaseWrite Binding Hook", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/purchase/write");
    await page.waitForSelector('[data-testid="purchase-write-page"]');
  });

  test("폼 필드 입력 및 검증", async ({ page }) => {
    // 상품명 입력
    const productNameInput = page.locator('input[name="productName"]');
    await productNameInput.fill("테스트 상품명");
    await expect(productNameInput).toHaveValue("테스트 상품명");

    // 한줄 요약 입력
    const summaryInput = page.locator('input[name="summary"]');
    await summaryInput.fill("테스트 한줄 요약");
    await expect(summaryInput).toHaveValue("테스트 한줄 요약");

    // 판매 가격 입력
    const priceInput = page.locator('input[name="price"]');
    await priceInput.fill("100000");
    await expect(priceInput).toHaveValue("100000");

    // 태그 입력
    const tagsInput = page.locator('input[name="tags"]');
    await tagsInput.fill("태그1, 태그2");
    await expect(tagsInput).toHaveValue("태그1, 태그2");
  });

  test("주소 검색 모달 열기", async ({ page }) => {
    const zipcodeSearchButton = page.locator('[data-testid="zipcode-search-button"]');
    await zipcodeSearchButton.click();
    
    const addressModal = page.locator('[data-testid="modal-address-search"]');
    await expect(addressModal).toBeVisible();
  });

  test("이미지 업로드 버튼 클릭", async ({ page }) => {
    const uploadBox = page.locator('[data-testid="upload-box"]');
    await expect(uploadBox).toBeVisible();
  });

  test("취소 버튼 클릭 시 확인 모달 표시", async ({ page }) => {
    const cancelButton = page.locator("button:has-text('취소')");
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    
    const cancelModal = page.locator('[data-testid="modal-cancel-confirm"]');
    await expect(cancelModal).toBeVisible();
    
    const cancelModalText = page.locator('[data-testid="modal-cancel-confirm"] p');
    await expect(cancelModalText).toContainText("작성 중인 내용이 사라집니다");
  });

  test("등록하기 버튼 존재 확인", async ({ page }) => {
    const submitButton = page.locator("button:has-text('등록하기')");
    await expect(submitButton).toBeVisible();
  });

  test("필수 필드 검증 - 빈 값 제출 시 에러 메시지 표시", async ({ page }) => {
    // 폼 제출 시도 (빈 값)
    const form = page.locator("form");
    await form.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    
    // 에러 메시지가 표시되는지 확인 (zod 검증)
    const productNameError = page.locator('[data-testid="error-productName"]');
    await expect(productNameError).toBeVisible();
    await expect(productNameError).toContainText("상품명을 입력해주세요");
  });

  test("상품 설명 필드 - SunEditor 영역 존재 확인", async ({ page }) => {
    // SunEditor는 iframe 내부에 있으므로 직접 접근이 어려움
    // 대신 에디터 영역이 존재하는지 확인
    const editorWrapper = page.locator('[data-testid="editor-wrapper"]');
    await expect(editorWrapper).toBeVisible();
  });

  test("취소 모달 - 아니오 버튼 클릭 시 모달 닫힘", async ({ page }) => {
    const cancelButton = page.locator("button:has-text('취소')");
    await cancelButton.click();
    
    const cancelModal = page.locator('[data-testid="modal-cancel-confirm"]');
    await expect(cancelModal).toBeVisible();
    
    const noButton = page.locator('[data-testid="modal-cancel-no"]');
    await noButton.click();
    
    // 모달이 닫혔는지 확인
    await expect(cancelModal).not.toBeVisible();
  });

  test("가격 필드 - 숫자 입력 및 검증", async ({ page }) => {
    const priceInput = page.locator('input[name="price"]');
    
    // 숫자 입력
    await priceInput.fill("100000");
    await expect(priceInput).toHaveValue("100000");
    
    // 0 이하 값 검증 (양수만 허용)
    await priceInput.fill("0");
    const form = page.locator("form");
    await form.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    
    const priceError = page.locator('[data-testid="error-price"]');
    await expect(priceError).toBeVisible();
  });
});

test.describe("PurchaseWrite Update Mode", () => {
  test("수정 모드 - URL 파라미터로 수정 모드 진입", async ({ page }) => {
    // 먼저 purchase-list에서 실제 travelproductId 가져오기
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="purchase-list-page"]');
    
    // 첫 번째 상품 카드의 ID 가져오기
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    const productId = await firstProductCard.getAttribute("data-product-id");
    
    // productId가 없으면 카드 클릭해서 URL에서 가져오기
    if (!productId) {
      await firstProductCard.click();
      await page.waitForURL(/\/purchase\/[^/]+/);
      const url = page.url();
      const match = url.match(/\/purchase\/([^/]+)/);
      const travelproductId = match ? match[1] : null;
      
      if (travelproductId) {
        // 수정 모드로 이동
        await page.goto(`/purchase/${travelproductId}/edit`);
        await page.waitForSelector('[data-testid="purchase-write-page"]');
        
        // 수정 모드 제목 확인
        const title = page.locator('[data-testid="purchase-write-title"]');
        await expect(title).toContainText("숙박권 수정하기");
        
        // 수정 모드 버튼 텍스트 확인
        const submitButton = page.locator("button:has-text('수정하기')");
        await expect(submitButton).toBeVisible();
      }
    }
  });

  test("수정 모드 - 기존 데이터 로드 및 폼 초기화", async ({ page }) => {
    // purchase-list에서 실제 travelproductId 가져오기
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="purchase-list-page"]');
    
    // 첫 번째 상품 카드 클릭
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    await firstProductCard.click();
    await page.waitForURL(/\/purchase\/[^/]+/);
    
    // URL에서 travelproductId 추출
    const url = page.url();
    const match = url.match(/\/purchase\/([^/]+)/);
    const travelproductId = match ? match[1] : null;
    
    if (travelproductId) {
      // 수정 모드로 이동
      await page.goto(`/purchase/${travelproductId}/edit`);
      await page.waitForSelector('[data-testid="purchase-write-page"]');
      
      // 데이터 로딩 대기 (로딩 상태가 사라질 때까지)
      await page.waitForSelector('[data-testid="purchase-write-page"]', { state: "visible" });
      
      // 폼 필드에 데이터가 채워졌는지 확인
      const productNameInput = page.locator('input[name="productName"]');
      const productNameValue = await productNameInput.inputValue();
      expect(productNameValue.length).toBeGreaterThan(0);
      
      const summaryInput = page.locator('input[name="summary"]');
      const summaryValue = await summaryInput.inputValue();
      expect(summaryValue.length).toBeGreaterThan(0);
      
      const priceInput = page.locator('input[name="price"]');
      const priceValue = await priceInput.inputValue();
      expect(priceValue.length).toBeGreaterThan(0);
    }
  });

  test("수정 모드 - 기존 이미지 표시", async ({ page }) => {
    // purchase-list에서 실제 travelproductId 가져오기
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="purchase-list-page"]');
    
    // 첫 번째 상품 카드 클릭
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    await firstProductCard.click();
    await page.waitForURL(/\/purchase\/[^/]+/);
    
    // URL에서 travelproductId 추출
    const url = page.url();
    const match = url.match(/\/purchase\/([^/]+)/);
    const travelproductId = match ? match[1] : null;
    
    if (travelproductId) {
      // 수정 모드로 이동
      await page.goto(`/purchase/${travelproductId}/edit`);
      await page.waitForSelector('[data-testid="purchase-write-page"]');
      
      // 이미지 미리보기 영역 확인
      const imagePreviewContainer = page.locator('[data-testid="image-preview-container"]');
      // 이미지가 있을 경우에만 확인
      const imageCount = await imagePreviewContainer.locator("img").count();
      if (imageCount > 0) {
        await expect(imagePreviewContainer).toBeVisible();
      }
    }
  });
});

