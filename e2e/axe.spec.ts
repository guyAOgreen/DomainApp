import { test, expect } from "./fixtures";
import { analyzeAccessibility } from "./axe";

test("checks our iframe title while leaving the embedded document out of scope", async ({
  page,
}) => {
  await page.goto("/chess");
  const iframe = page.getByTitle("Lichess game 1");
  await expect(iframe).toBeVisible();
  // Seed a deliberately inaccessible external document to catch changes in axe's frame handling.
  await iframe
    .contentFrame()
    .locator("body")
    .evaluate((body) => {
      body.innerHTML = '<img src="data:,invalid"><button></button>';
    });
  const scoped = await analyzeAccessibility(page);
  expect(scoped.violations).toEqual([]);

  await iframe.evaluate((element) => element.removeAttribute("title"));
  const untitled = await analyzeAccessibility(page);
  expect(untitled.violations.map((result) => result.id)).toContain("frame-title");
});
