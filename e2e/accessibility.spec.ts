import AxeBuilder from "@axe-core/playwright";
import type { Page, TestInfo } from "@playwright/test";
import { test, expect, cvUrl } from "./fixtures";

const scan = async (page: Page, testInfo: TestInfo) => {
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page })
    // Keep all default rules, including colour contrast. Our iframe elements remain checked;
    // the PDF viewer and third-party chess UI inside them are outside this app's ownership.
    .options({ iframes: false })
    .analyze();
  await testInfo.attach("axe-results", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });
  expect(results.violations).toEqual([]);
};

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(colorScheme, () => {
    test.use({ colorScheme });

    for (const route of ["/", "/projects", "/about-me", "/cv", "/chess"]) {
      test(`checks ${route} after content loads`, async ({ page }, testInfo) => {
        await page.goto(route);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        if (route === "/about-me") {
          const photo = page.getByRole("img", { name: "Browser test gallery image", exact: true });
          await expect(photo).toBeVisible();
          await expect
            .poll(() =>
              photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
            )
            .toBe(true);
        }
        if (route === "/chess") {
          await expect(page.getByTitle("Lichess game 1")).toBeVisible();
          await expect(page.getByRole("main").getByRole("status")).toHaveText("Game 1 of 3");
        }
        if (route === "/projects") {
          const image = page.getByRole("img", { name: "FootyBru landing page", exact: true });
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) => element.complete && element.naturalWidth > 0
              )
            )
            .toBe(true);
        }
        await scan(page, testInfo);
      });
    }

    test("checks the expanded CV preview", async ({ page }, testInfo) => {
      await page.goto("/cv");
      await page.getByRole("link", { name: "Preview on this page" }).click();
      await expect(page.getByTitle("Guy Green CV", { exact: true })).toBeVisible();
      await expect(page.getByTitle("Guy Green CV", { exact: true })).toHaveAttribute("src", cvUrl);
      await expect(
        page.getByRole("link", { name: "open the CV PDF in a new tab", exact: true })
      ).toBeVisible();
      await scan(page, testInfo);
    });

    test("checks the open mobile menu", async ({ page, isMobile }, testInfo) => {
      test.skip(!isMobile, "The collapsible menu is specific to mobile widths");
      await page.goto("/");
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
      await scan(page, testInfo);
    });

    test("checks the chess profile links", async ({ page }, testInfo) => {
      await page.goto("/chess");
      await page.getByRole("button", { name: "Find Me", exact: true }).click();
      await expect(page.getByRole("heading", { name: "Find Me Online" })).toBeVisible();
      await scan(page, testInfo);
    });
  });
}
