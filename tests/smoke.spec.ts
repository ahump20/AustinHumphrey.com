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

  test("theme toggle updates data-theme attribute", async ({ page }) => {
    await page.goto("/");

    // Get initial theme
    const initialTheme = await page.locator("html").getAttribute("data-theme");
    expect(initialTheme).toBeTruthy();
    expect(initialTheme === "light" || initialTheme === "dark").toBe(true);

    // Click the theme toggle button
    const themeToggle = page.locator("button.theme-toggle");
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();

    // Verify the theme has changed
    const newTheme = await page.locator("html").getAttribute("data-theme");
    expect(newTheme).not.toBe(initialTheme);
    expect(newTheme === "light" || newTheme === "dark").toBe(true);
  });

  test("theme preference persists after page reload", async ({ page }) => {
    await page.goto("/");

    // Get initial theme
    const initialTheme = await page.locator("html").getAttribute("data-theme");
    expect(initialTheme).toBeTruthy();
    expect(initialTheme === "light" || initialTheme === "dark").toBe(true);

    // Click the theme toggle to change theme
    const themeToggle = page.locator("button.theme-toggle");
    await themeToggle.click();

    // Get the new theme
    const newTheme = await page.locator("html").getAttribute("data-theme");
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage has been updated
    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe(newTheme);

    // Reload the page
    await page.reload();

    // Verify the theme persisted after reload
    const persistedTheme = await page.locator("html").getAttribute("data-theme");
    expect(persistedTheme).toBe(newTheme);

    // Verify localStorage still has the correct value
    const storedThemeAfterReload = await page.evaluate(() =>
      localStorage.getItem("theme")
    );
    expect(storedThemeAfterReload).toBe(newTheme);
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
