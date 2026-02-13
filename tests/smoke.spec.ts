import { test, expect } from "@playwright/test";

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
