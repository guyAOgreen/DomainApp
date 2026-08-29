import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "./axe";

/**
 * Guards the accessibility suite against becoming vacuous. If the helper ever stopped detecting
 * violations, every route check would pass for the wrong reason and go unnoticed.
 */
describe("expectNoAxeViolations", () => {
  const renderMarkup = (markup: string) => {
    const container = document.createElement("div");
    container.innerHTML = markup;
    document.body.appendChild(container);
    return container;
  };

  it("rejects when the container holds a real violation", async () => {
    const container = renderMarkup('<img src="cat.png">');

    await expect(expectNoAxeViolations(container)).rejects.toThrow(/image-alt/);

    container.remove();
  });

  it("resolves when the container is clean", async () => {
    const container = renderMarkup('<img src="cat.png" alt="A sleeping cat">');

    await expect(expectNoAxeViolations(container)).resolves.toBeUndefined();

    container.remove();
  });
});
