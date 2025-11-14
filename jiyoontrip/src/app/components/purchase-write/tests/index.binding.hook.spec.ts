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
    const editorWrapper = page.locator(".editorWrapper");
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

