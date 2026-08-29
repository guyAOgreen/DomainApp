import axe from "axe-core";

/**
 * Colour-contrast rules are switched off deliberately, not by oversight.
 *
 * They need real layout and computed colours to evaluate, which jsdom does not provide, so axe
 * cannot report on them here. Leaving them enabled would imply a guarantee this suite does not
 * make. Contrast is currently checked by hand; covering it automatically needs axe running in a
 * real browser.
 */
const rulesUnavailableInJsdom = {
  "color-contrast": { enabled: false },
  "color-contrast-enhanced": { enabled: false },
};

const describeViolation = (violation: axe.Result) => {
  const targets = violation.nodes.map((node) => `      ${node.target.join(" ")}`).join("\n");
  return `  ${violation.id} (${violation.impact ?? "unknown impact"}): ${violation.help}\n${targets}`;
};

export const expectNoAxeViolations = async (container: HTMLElement) => {
  const { violations } = await axe.run(container, {
    rules: rulesUnavailableInJsdom,
    // The embedded CV and Lichess boards are cross-origin third-party documents, so their
    // contents are neither reachable from here nor ours to fix. The iframe elements themselves
    // are still checked in the parent document, which is where our own markup lives.
    iframes: false,
  });

  if (violations.length > 0) {
    throw new Error(
      `Expected no accessibility violations, found ${violations.length}:\n` +
        violations.map(describeViolation).join("\n")
    );
  }
};
