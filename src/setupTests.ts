import "@testing-library/jest-dom/vitest";

// jsdom does not implement layout or scrolling; real scrolling is checked in the browser.
Element.prototype.scrollIntoView = vi.fn();
