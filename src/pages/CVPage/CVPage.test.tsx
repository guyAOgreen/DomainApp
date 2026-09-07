import { render, screen } from "@testing-library/react";
import CvPage from "./CVPage";

const expectedCvUrl =
  "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/cv/GuyGreenCV.pdf";

describe("CvPage", () => {
  it("loads the stable public OCI PDF in the accessible viewer", () => {
    render(<CvPage />);

    expect(screen.getByTitle("Guy Green CV")).toHaveAttribute("src", expectedCvUrl);
  });

  it("opens the same PDF in a new tab for browser-native viewing and saving", () => {
    render(<CvPage />);

    const pdfLink = screen.getByRole("link", {
      name: "Open or download CV (PDF) (opens in a new tab)",
    });
    expect(pdfLink).toHaveAttribute("href", expectedCvUrl);
    expect(pdfLink).toHaveAttribute("target", "_blank");
    expect(pdfLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(pdfLink).not.toHaveAttribute("download");
  });

  it("keeps PDF and HTML alternatives available independently of the embedded viewer", () => {
    render(<CvPage />);

    const fallbackLink = screen.getByRole("link", { name: "open the CV PDF in a new tab" });
    expect(fallbackLink).toHaveAttribute("href", expectedCvUrl);
    expect(fallbackLink).toHaveAttribute("target", "_blank");
    expect(fallbackLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Read the HTML version below" })).toHaveAttribute(
      "href",
      "#cv-content"
    );
    expect(screen.getByRole("heading", { name: "Education" }).closest("section")).toHaveAttribute(
      "id",
      "cv-content"
    );
  });
});
