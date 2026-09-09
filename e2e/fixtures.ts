import { test as base, expect } from "@playwright/test";
import { fileURLToPath } from "node:url";

const assetsBase =
  "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/";
export const cvUrl = `${assetsBase}cv/GuyGreenCV.pdf`;
const manifestUrl = `${assetsBase}about-me/gallery.json`;
const photoUrl = `${assetsBase}about-me/images/browser-fixture.svg`;
const profileUrl = `${assetsBase}about-me/images/profile.jpg`;
const gameIds = ["e2eGame1", "e2eGame2", "e2eGame3"];
const headers = { "access-control-allow-origin": "*" };

export const test = base.extend({
  context: async ({ context, baseURL }, use) => {
    const unexpectedRequests: string[] = [];
    // Intercept network requests while leaving Chromium's bundled PDF viewer resources alone.
    await context.route(/^https?:/, async (route) => {
      const url = new URL(route.request().url());
      if (url.origin === baseURL) {
        await route.continue();
      } else if (url.href === manifestUrl) {
        await route.fulfill({
          headers,
          json: {
            images: [
              { src: photoUrl, alt: "Browser test gallery image", caption: "Gallery fixture." },
            ],
          },
        });
      } else if (url.href === photoUrl || url.href === profileUrl) {
        await route.fulfill({
          headers,
          contentType: "image/svg+xml",
          path: fileURLToPath(new URL("./fixtures/photo.svg", import.meta.url)),
        });
      } else if (url.href === cvUrl) {
        await route.fulfill({
          headers: { ...headers, "content-disposition": 'inline; filename="GuyGreenCV.pdf"' },
          contentType: "application/pdf",
          path: fileURLToPath(new URL("./fixtures/cv.pdf", import.meta.url)),
        });
      } else if (
        url.origin === "https://lichess.org" &&
        url.pathname === "/api/games/user/guygreenInClassAtUCT"
      ) {
        await route.fulfill({
          headers,
          contentType: "application/x-ndjson",
          body: gameIds.map((id) => JSON.stringify({ id })).join("\n"),
        });
      } else if (
        url.origin === "https://lichess.org" &&
        gameIds.some((id) => url.pathname === `/embed/${id}`)
      ) {
        // Only our iframe's URL and accessible name are under test, not Lichess's UI.
        await route.fulfill({
          contentType: "text/html",
          body: '<!doctype html><html lang="en"><title>Chess fixture</title><body></body></html>',
        });
      } else {
        unexpectedRequests.push(url.href);
        await route.abort("blockedbyclient");
      }
    });

    await use(context);
    expect(unexpectedRequests, "External requests need explicit local fixtures").toEqual([]);
  },
});

export { expect } from "@playwright/test";
