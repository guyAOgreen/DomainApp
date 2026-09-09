import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

export const analyzeAccessibility = (page: Page) =>
  new AxeBuilder({ page })
    // In @axe-core/playwright 4.13, the default runPartial path ignores this option.
    // Legacy mode honours it while still checking our iframe elements and their titles.
    .options({ iframes: false })
    .setLegacyMode()
    .analyze();
