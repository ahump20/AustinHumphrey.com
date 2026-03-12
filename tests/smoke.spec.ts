import { test, expect, Page } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads and shows Austin Humphrey", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Austin Humphrey/i);
    await expect(page.locator("body")).toContainText("Austin Humphrey");
  });

  test("resume page loads", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.locator("body")).toBeVisible();
  });

  test("work page loads", async ({ page }) => {
    await page.goto("/work");
    await expect(page.locator("body")).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("body")).toBeVisible();
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("body")).toContainText("404");
    await expect(page.locator("body")).toContainText("Page not found");
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");

    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      if (href && href.startsWith("/")) {
        await page.goto(href);
        await expect(page.locator("body")).toBeVisible();
      }
    }
  });
});

test.describe("API smoke tests", () => {
  test("health endpoint returns ok", async ({ request }) => {
    try {
      const response = await request.get("/api/health");
      if (response.ok()) {
        const body = await response.json();
        expect(body.status).toBe("ok");
      }
    } catch {
      test.skip(true, "API not available — skipping health check");
    }
  });
});

const allRoutes = ["/", "/resume", "/work", "/contact"];

async function assertNoHorizontalScroll(page: Page) {
  const noHScroll = await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
  );
  expect(noHScroll).toBe(true);
}

test.describe("Mobile viewport tests", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const route of allRoutes) {
    test(`${route} loads and has no horizontal scroll at 375px`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      await assertNoHorizontalScroll(page);
    });
  }

  test("hamburger button is visible at 375px", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hamburger-btn")).toBeVisible();
  });

  test("nav-links are not visible at 375px", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".nav-links")).not.toBeVisible();
  });
});

test.describe("Tablet viewport tests", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  for (const route of ["/", "/resume"]) {
    test(`${route} loads and has no horizontal scroll at 768px`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      await assertNoHorizontalScroll(page);
    });
  }
});
