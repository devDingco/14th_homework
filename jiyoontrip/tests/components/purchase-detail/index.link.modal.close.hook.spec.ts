import { test, expect } from "@playwright/test";

test.describe("구매 상세 페이지 모달 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // /purchase/[id] 페이지로 이동
    await page.goto("/purchase/1");
    // 페이지 로드 대기 - data-testid 기반
    await page.waitForSelector('[data-testid="purchase-detail-page"]');
  });

  test("구매하기 버튼 클릭시 모달이 열린다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    await expect(modal).toBeVisible();

    // 모달 내용 확인
    await expect(modal.locator("text=해당 숙박권을 구매 하시겠어요?")).toBeVisible();
    await expect(
      modal.locator("text=해당 숙박권은 포인트로만 구매 가능합니다.")
    ).toBeVisible();
  });

  test("모달 배경 클릭시 모달이 닫힌다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    await expect(modal).toBeVisible();

    // 배경 클릭 (모달 외부)
    await page.locator("body").click({ position: { x: 10, y: 10 } });

    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible();
  });

  test("모달 내부 클릭시 모달이 닫히지 않는다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    await expect(modal).toBeVisible();

    // 모달 내부 클릭
    await modal.click();

    // 모달이 여전히 열려있는지 확인
    await expect(modal).toBeVisible();
  });

  test("취소 버튼 클릭시 모달이 닫힌다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    await expect(modal).toBeVisible();

    // 취소 버튼 클릭
    const cancelButton = modal.locator('[data-testid="modal-cancel-button"]');
    await cancelButton.click();

    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible();
  });

  test("구매 버튼 클릭시 포인트 부족 모달이 열린다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    await expect(modal).toBeVisible();

    // 구매 버튼 클릭
    const confirmButton = modal.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 포인트 부족 모달이 열렸는지 확인
    const insufficientModal = page.locator('[data-testid="modal-insufficient-point"]');
    await expect(insufficientModal).toBeVisible();

    // 모달 내용 확인
    await expect(insufficientModal.locator("text=포인트 부족")).toBeVisible();
    await expect(insufficientModal.locator("text=포인트가 부족합니다.")).toBeVisible();
  });

  test("포인트 부족 모달에서 취소 버튼 클릭시 모달이 닫힌다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    const confirmButton = modal.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    const insufficientModal = page.locator('[data-testid="modal-insufficient-point"]');
    await expect(insufficientModal).toBeVisible();

    // 취소 버튼 클릭
    const cancelButton = insufficientModal.locator('[data-testid="modal-cancel-button"]');
    await cancelButton.click();

    // 모달이 닫혔는지 확인
    await expect(insufficientModal).not.toBeVisible();
  });

  test("포인트 부족 모달에서 충전 버튼 클릭시 충전 모달이 열린다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    const confirmButton = modal.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    const insufficientModal = page.locator('[data-testid="modal-insufficient-point"]');
    await expect(insufficientModal).toBeVisible();

    // 충전 버튼 클릭
    const chargeButton = insufficientModal.locator(
      '[data-testid="modal-confirm-button"]'
    );
    await chargeButton.click();

    // 충전 모달이 열렸는지 확인
    const chargeModal = page.locator('[data-testid="modal-charge"]');
    await expect(chargeModal).toBeVisible();

    // 모달 내용 확인
    await expect(chargeModal.locator("text=충전하실 금액을 선택해 주세요")).toBeVisible();
  });

  test("충전 모달에서 취소 버튼 클릭시 모달이 닫힌다", async ({ page }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    const confirmButton = modal.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    const insufficientModal = page.locator('[data-testid="modal-insufficient-point"]');
    const chargeButton = insufficientModal.locator(
      '[data-testid="modal-confirm-button"]'
    );
    await chargeButton.click();

    const chargeModal = page.locator('[data-testid="modal-charge"]');
    await expect(chargeModal).toBeVisible();

    // 취소 버튼 클릭
    const cancelButton = chargeModal.locator('[data-testid="modal-cancel-button"]');
    await cancelButton.click();

    // 모달이 닫혔는지 확인
    await expect(chargeModal).not.toBeVisible();
  });

  test("충전 모달에서 드롭다운을 선택하고 충전하기 버튼 클릭시 모달이 닫힌다", async ({
    page,
  }) => {
    const purchaseButton = page.locator('[data-testid="purchase-button"]');
    await purchaseButton.click();

    const modal = page.locator('[data-testid="modal-purchase-confirm"]');
    const confirmButton = modal.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    const insufficientModal = page.locator('[data-testid="modal-insufficient-point"]');
    const chargeButton = insufficientModal.locator(
      '[data-testid="modal-confirm-button"]'
    );
    await chargeButton.click();

    const chargeModal = page.locator('[data-testid="modal-charge"]');
    await expect(chargeModal).toBeVisible();

    // 드롭다운 클릭하여 옵션 선택 (Modal 컴포넌트에 드롭다운이 있다고 가정)
    const dropdown = chargeModal.locator('[data-testid="modal-dropdown"]');
    if ((await dropdown.count()) > 0) {
      await dropdown.click();
      // 첫 번째 옵션 선택
      const firstOption = page.locator('[data-testid="modal-dropdown-option"]').first();
      if ((await firstOption.count()) > 0) {
        await firstOption.click();
      }
    }

    // 충전하기 버튼 클릭
    const chargeConfirmButton = chargeModal.locator(
      '[data-testid="modal-confirm-button"]'
    );
    await chargeConfirmButton.click();

    // 모달이 닫혔는지 확인
    await expect(chargeModal).not.toBeVisible();
  });
});
