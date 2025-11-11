import { test, expect } from "@playwright/test";

test.describe("Navigation 링크 라우팅 및 액티브 상태 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // /boards 페이지로 이동하여 테스트 시작
    await page.goto("/boards");
    // navigation이 로드될 때까지 대기
    await page.waitForSelector('[data-testid="navigation"]');
  });

  test("트립토크 메뉴 클릭시 /boards로 이동하고 액티브 상태가 적용된다", async ({
    page,
  }) => {
    const tripTalkButton = page.locator('[data-testid="nav-boards"]');

    await tripTalkButton.click();
    await page.waitForURL("/boards");

    expect(page.url()).toContain("/boards");

    // 액티브 상태 확인 (border가 적용되어야 함)
    const borderBottom = await tripTalkButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });
    expect(borderBottom).toContain("1px");
  });

  test("숙박권 구매 메뉴 클릭시 /purchase로 이동하고 액티브 상태가 적용된다", async ({
    page,
  }) => {
    const purchaseButton = page.locator('[data-testid="nav-purchase"]');

    await purchaseButton.click();
    await page.waitForURL("/purchase");

    expect(page.url()).toContain("/purchase");

    // 액티브 상태 확인
    const borderBottom = await purchaseButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });
    expect(borderBottom).toContain("1px");
  });

  test("마이페이지 메뉴 클릭시 /mypage/transaction-bookmark로 이동하고 액티브 상태가 적용된다", async ({
    page,
  }) => {
    const mypageButton = page.locator('[data-testid="nav-mypage"]');

    await mypageButton.click();
    await page.waitForURL("/mypage/transaction-bookmark");

    expect(page.url()).toContain("/mypage/transaction-bookmark");

    // 액티브 상태 확인
    const borderBottom = await mypageButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });
    expect(borderBottom).toContain("1px");
  });

  test("로고 클릭시 /boards로 이동한다", async ({ page }) => {
    // 다른 페이지로 먼저 이동
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="navigation"]');

    const logoButton = page.locator('[data-testid="nav-logo"]');

    await logoButton.click();
    await page.waitForURL("/boards");

    expect(page.url()).toContain("/boards");
  });

  test("로그인 버튼 클릭시 /auth/signin으로 이동한다", async ({ page }) => {
    // 로그아웃 상태를 위해 localStorage 클리어
    await page.evaluate(() => {
      localStorage.removeItem("accessToken");
    });

    await page.goto("/boards");
    await page.waitForSelector('[data-testid="navigation"]');

    const loginButton = page.locator('[data-testid="nav-login"]');

    // 로그인 버튼이 보이는지 확인
    if ((await loginButton.count()) > 0) {
      await loginButton.click();
      await page.waitForURL("/auth/signin");

      expect(page.url()).toContain("/auth/signin");
    }
  });

  test("현재 페이지에 해당하는 메뉴만 액티브 상태를 가진다", async ({
    page,
  }) => {
    await page.goto("/boards");
    await page.waitForSelector('[data-testid="navigation"]');

    const tripTalkButton = page.locator('[data-testid="nav-boards"]');
    const purchaseButton = page.locator('[data-testid="nav-purchase"]');

    // /boards 페이지에서는 트립토크만 액티브
    const tripTalkBorder = await tripTalkButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });
    const purchaseBorder = await purchaseButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });

    expect(tripTalkBorder).toContain("1px");
    expect(purchaseBorder).not.toContain("1px solid");
  });

  test("/purchase 페이지에서는 숙박권 구매 메뉴만 액티브 상태를 가진다", async ({
    page,
  }) => {
    await page.goto("/purchase");
    await page.waitForSelector('[data-testid="navigation"]');

    const tripTalkButton = page.locator('[data-testid="nav-boards"]');
    const purchaseButton = page.locator('[data-testid="nav-purchase"]');

    const tripTalkBorder = await tripTalkButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });
    const purchaseBorder = await purchaseButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });

    expect(purchaseBorder).toContain("1px");
    expect(tripTalkBorder).not.toContain("1px solid");
  });

  test("/mypage 경로에서는 마이페이지 메뉴가 액티브 상태를 가진다", async ({
    page,
  }) => {
    await page.goto("/mypage/transaction-bookmark");
    await page.waitForSelector('[data-testid="navigation"]');

    const mypageButton = page.locator('[data-testid="nav-mypage"]');

    const mypageBorder = await mypageButton.evaluate((el) => {
      return window.getComputedStyle(el).borderBottom;
    });

    expect(mypageBorder).toContain("1px");
  });
});

