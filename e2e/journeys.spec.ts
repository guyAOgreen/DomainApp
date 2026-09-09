import { test, expect, cvUrl } from "./fixtures";

test("visits projects and CV from Home, then uses browser Back", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my projects" }).click();
  await expect(page).toHaveURL("/projects");
  const screenshots = page.getByRole("region", { name: "FootyBru product gallery" });
  const screenshot = screenshots.getByRole("img", { name: "FootyBru landing page", exact: true });
  await expect(screenshot).toBeVisible();
  await expect
    .poll(() =>
      screenshot.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
    )
    .toBe(true);
  await screenshots.getByRole("button", { name: "Next image" }).click();
  const dashboard = screenshots.getByRole("img", { name: "FootyBru group dashboard" });
  await expect(dashboard).toBeVisible();
  await expect
    .poll(() =>
      dashboard.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
    )
    .toBe(true);
  if (isMobile) await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "CV", exact: true })
    .click();
  await expect(page).toHaveURL("/cv");
  await expect(page.getByRole("heading", { name: "Curriculum Vitae" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL("/projects");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL("/");
});

test("loads CV directly, opens its preview and opens the PDF in a new tab", async ({
  page,
  context,
}) => {
  await page.goto("/cv");
  await expect(page.getByTitle("Guy Green CV", { exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "Preview on this page" }).click();
  await expect(page.getByTitle("Guy Green CV", { exact: true })).toHaveAttribute("src", cvUrl);
  await expect(page.getByText("Preview CV (PDF)", { exact: true })).toBeFocused();
  await expect(
    page.getByRole("link", { name: "open the CV PDF in a new tab", exact: true })
  ).toHaveAttribute("href", cvUrl);
  await page.reload();
  await expect(page.getByTitle("Guy Green CV", { exact: true })).toBeVisible();
  const pdfLink = page.getByRole("link", {
    name: "Open CV (PDF) (opens in a new tab)",
    exact: true,
  });
  await expect(pdfLink).toHaveAttribute("href", cvUrl);
  await expect(pdfLink).toHaveAttribute("target", "_blank");
  const popupPromise = context.waitForEvent("page");
  await pdfLink.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(cvUrl);
  await expect(page).toHaveURL("/cv#cv-preview");
  await popup.close();
});

test("uses the skip link and mobile navigation with the keyboard", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The collapsible menu is specific to mobile widths");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveCount(0);
  const close = page.getByRole("button", { name: "Close navigation menu" });
  await expect(close).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "About", exact: true })
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/about-me");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
  await expect(page.getByRole("main")).toBeFocused();
});

test("selects recent games and switches to the chess profile links", async ({ page }) => {
  await page.goto("/chess");
  await expect(page.getByTitle("Lichess game 1")).toHaveAttribute("src", /\/embed\/e2eGame1\?/);
  await page.getByRole("button", { name: "Show game 3" }).click();
  await expect(page.getByTitle("Lichess game 3")).toHaveAttribute("src", /\/embed\/e2eGame3\?/);
  await page.getByRole("button", { name: "Previous game" }).click();
  await expect(page.getByTitle("Lichess game 2")).toHaveAttribute("src", /\/embed\/e2eGame2\?/);
  await expect(page.getByRole("main").getByRole("status")).toHaveText("Game 2 of 3");
  await page.getByRole("button", { name: "Find Me", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Find Me Online" })).toBeVisible();
  await expect(page.getByRole("link", { name: /GuyGreenInClassAtUCT on Lichess/ })).toHaveAttribute(
    "href",
    "https://lichess.org/@/guygreenInClassAtUCT"
  );
  await expect(
    page.getByRole("link", { name: /WowThisGuyIsAmazing on Chess.com/ })
  ).toHaveAttribute("href", "https://www.chess.com/member/wowthisguyisamazing");
});
