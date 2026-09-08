import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CvPage from "./CVPage";

const expectedCvUrl =
  "https://objectstorage.af-johannesburg-1.oraclecloud.com/n/ax1xpn4rr6se/b/domainapp-public-assets/o/cv/GuyGreenCV.pdf";

const renderCv = () =>
  render(
    <MemoryRouter>
      <CvPage />
    </MemoryRouter>
  );

describe("CvPage", () => {
  it("shows the web résumé first without loading an embedded PDF", () => {
    renderCv();

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)
    ).toEqual(["Professional Experience", "Skills", "Education", "Selected achievements"]);
    expect(screen.getByRole("heading", { name: "Oracle — Software Engineer" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "ACI — Software Developer" })).toBeVisible();
    expect(screen.queryByTitle("Guy Green CV")).not.toBeInTheDocument();
    expect(screen.getByText("Preview CV (PDF)").closest("details")).not.toHaveAttribute("open");
  });

  it("consolidates the technologies into readable skill groups", () => {
    renderCv();

    const skills = within(screen.getByRole("region", { name: "Skills" }));
    expect(skills.getByText("Languages")).toBeVisible();
    expect(skills.getByText("Web & backend")).toBeVisible();
    expect(skills.getByText("Cloud & infrastructure")).toBeVisible();
    const technologies = skills.getAllByRole("listitem").map((item) => item.textContent);
    expect(new Set(technologies).size).toBe(technologies.length);
    expect(technologies).toEqual(
      expect.arrayContaining(["React", "TypeScript", "Bash", "Terraform", "Ansible", "Dropwizard"])
    );
    const experience = within(screen.getByRole("region", { name: "Professional Experience" }));
    expect(experience.queryByText(/Java, Python, Bash/)).not.toBeInTheDocument();
  });

  it("keeps selected achievements and links to the fuller personal profile", () => {
    renderCv();

    const achievements = within(screen.getByRole("region", { name: "Selected achievements" }));
    expect(achievements.getByText(/represented.*province at junior level/i)).toBeVisible();
    expect(achievements.getByText(/Ambassador for Epicenter Virgin Active Padel/)).toBeVisible();
    expect(achievements.getByRole("link", { name: "More about me" })).toHaveAttribute(
      "href",
      "/about-me"
    );
  });

  it("shows the separate degree dates recorded in the uploaded CV", () => {
    renderCv();

    const education = within(screen.getByRole("region", { name: "Education" }));
    expect(education.getByRole("heading", { name: "University of Cape Town (UCT)" })).toBeVisible();
    expect(education.getAllByRole("term").map((term) => term.textContent)).toEqual([
      "Honours in Computer Science",
      "BSc Applied Mathematics & Computer Science",
    ]);
    expect(education.getAllByRole("definition").map((date) => date.textContent)).toEqual([
      "2018",
      "2014 – 2016",
    ]);
  });

  it("opens the same PDF in a new tab for browser-native viewing and saving", () => {
    renderCv();

    const pdfLink = screen.getByRole("link", {
      name: "Open CV (PDF) (opens in a new tab)",
    });
    expect(pdfLink).toHaveAttribute("href", expectedCvUrl);
    expect(pdfLink).toHaveAttribute("target", "_blank");
    expect(pdfLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(pdfLink).not.toHaveAttribute("download");
  });

  it("loads the stable public PDF only when its preview is opened and allows it to close", async () => {
    const user = userEvent.setup();
    renderCv();
    const preview = screen.getByText("Preview CV (PDF)");

    await user.click(preview);

    expect(await screen.findByTitle("Guy Green CV")).toHaveAttribute("src", expectedCvUrl);
    expect(preview.closest("details")).toHaveAttribute("open");
    expect(preview).toHaveFocus();

    await user.click(preview);

    expect(preview.closest("details")).not.toHaveAttribute("open");
    expect(screen.queryByTitle("Guy Green CV")).not.toBeInTheDocument();
    expect(preview).toHaveFocus();

    await user.click(preview);

    expect(await screen.findByTitle("Guy Green CV")).toHaveAttribute("src", expectedCvUrl);
  });

  it("opens the on-page preview from its header link and focuses the preview control", async () => {
    const user = userEvent.setup();
    renderCv();

    const previewLink = screen.getByRole("link", { name: "Preview on this page" });
    const previewControl = screen.getByText("Preview CV (PDF)");
    expect(previewLink).toHaveAttribute("href", "#cv-preview");
    expect(previewControl).toHaveAttribute("id", "cv-preview");

    await user.click(previewLink);

    expect(await screen.findByTitle("Guy Green CV")).toHaveAttribute("src", expectedCvUrl);
    expect(previewControl.closest("details")).toHaveAttribute("open");
    expect(previewControl).toHaveFocus();
  });

  it("keeps an accessible fallback and the web résumé outside the PDF viewer", async () => {
    const user = userEvent.setup();
    renderCv();
    await user.click(screen.getByText("Preview CV (PDF)"));

    const fallbackLink = screen.getByRole("link", { name: "open the CV PDF in a new tab" });
    expect(fallbackLink).toHaveAttribute("href", expectedCvUrl);
    expect(fallbackLink).toHaveAttribute("target", "_blank");
    expect(fallbackLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(fallbackLink).toBeVisible();
    expect(fallbackLink.closest("iframe")).toBeNull();
    expect(screen.getByRole("region", { name: "Professional Experience" })).toBeVisible();
    expect(
      screen.getByRole("region", { name: "Professional Experience" }).closest("#cv-content")
    ).toHaveAttribute("id", "cv-content");
  });
});
