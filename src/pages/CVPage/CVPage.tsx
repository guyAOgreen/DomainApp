import React from "react";
import { Link } from "react-router-dom";
import { cvPdfUrl } from "../../constants/assetConstants";
import { appRoutes } from "../../constants/routeConstants";

const skillGroups = [
  { name: "Languages", skills: ["Java", "Python", "TypeScript", "Bash"] },
  { name: "Web & backend", skills: ["React", "Node.js", "Dropwizard", "CSS", "Tailwind CSS"] },
  {
    name: "Cloud & infrastructure",
    skills: ["OCI", "Docker", "Kubernetes", "Terraform", "Ansible"],
  },
];

const CvPage: React.FC = () => {
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);
  const pdfPreviewRef = React.useRef<HTMLDetailsElement>(null);

  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-gray-50 px-4 py-10 text-gray-900 md:px-10 md:py-14 dark:bg-gray-900 dark:text-white">
      <header className="mb-10 flex flex-col gap-6 border-b border-gray-200 pb-8 lg:flex-row lg:items-start lg:justify-between dark:border-gray-700">
        <div>
          <h1 className="mb-3 text-4xl font-extrabold md:text-5xl">Curriculum Vitae</h1>
          <p className="max-w-xl text-lg text-gray-700 dark:text-gray-300">
            Software development across cloud infrastructure and payment systems.
          </p>
        </div>
        <div className="lg:max-w-xs lg:shrink-0">
          <a
            href={cvPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open CV (PDF) (opens in a new tab)"
            className="inline-flex justify-center rounded-lg bg-blue-700 px-4 py-3 text-center font-semibold text-white shadow transition hover:bg-blue-800"
          >
            Open CV (PDF)
          </a>
          <p className="mt-3 max-w-xs text-sm text-gray-600 dark:text-gray-400">
            Opens in a new tab. Use your browser’s download or share controls to save a copy.
          </p>
          <a
            href="#cv-preview"
            onClick={() => {
              const preview = pdfPreviewRef.current;
              if (preview) {
                preview.open = true;
                preview.querySelector("summary")?.focus();
              }
            }}
            className="mt-3 inline-block font-semibold text-blue-700 underline dark:text-blue-300"
          >
            Preview on this page
          </a>
        </div>
      </header>

      <div id="cv-content" className="space-y-10">
        <section aria-labelledby="cv-experience-heading">
          <h2 id="cv-experience-heading" className="mb-5 text-2xl font-semibold">
            Professional Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-bold">Oracle — Software Engineer</h3>
                <p className="shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
                  April 2020 – Present
                </p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  Worked on Oracle Cloud Infrastructure (OCI), multicloud, and edge computing
                  projects.
                </li>
                <li>Collaborated with cross-functional teams to design scalable applications.</li>
              </ul>
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-bold">ACI — Software Developer</h3>
                <p className="shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
                  2019 – April 2020
                </p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  Developed payment-processing software for point-of-sale and upstream systems.
                </li>
                <li>
                  Participated in the full development lifecycle, from requirements to deployment.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="cv-skills-heading">
          <h2 id="cv-skills-heading" className="mb-5 text-2xl font-semibold">
            Skills
          </h2>
          <dl className="grid gap-5 md:grid-cols-3">
            {skillGroups.map(({ name, skills }) => (
              <div key={name}>
                <dt className="mb-2 font-semibold">{name}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md bg-gray-200 px-2.5 py-1 text-sm dark:bg-gray-800"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="cv-education-heading">
            <h2 id="cv-education-heading" className="mb-5 text-2xl font-semibold">
              Education
            </h2>
            <h3 className="mb-3 text-xl font-bold">University of Cape Town (UCT)</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-gray-700 dark:text-gray-300">Honours in Computer Science</dt>
                <dd className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">2018</dd>
              </div>
              <div>
                <dt className="text-gray-700 dark:text-gray-300">
                  BSc Applied Mathematics & Computer Science
                </dt>
                <dd className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  2014 – 2016
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="cv-achievements-heading">
            <h2 id="cv-achievements-heading" className="mb-5 text-2xl font-semibold">
              Selected achievements
            </h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 dark:text-gray-300">
              <li>Represented my province at junior level in chess.</li>
              <li>Ambassador for Epicenter Virgin Active Padel.</li>
            </ul>
            <Link
              to={appRoutes.aboutMe}
              className="mt-4 inline-block font-semibold text-blue-700 underline dark:text-blue-300"
            >
              More about me
            </Link>
          </section>
        </div>
      </div>

      <details
        ref={pdfPreviewRef}
        onToggle={(event) => setShowPdfPreview(event.currentTarget.open)}
        className="mt-10 rounded-lg border border-gray-300 dark:border-gray-600"
      >
        <summary
          id="cv-preview"
          className="cursor-pointer rounded-lg px-5 py-4 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Preview CV (PDF)
        </summary>
        <div className="border-t border-gray-300 p-4 dark:border-gray-600">
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            If the preview does not load,{" "}
            <a
              href={cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline dark:text-blue-300"
            >
              open the CV PDF in a new tab
            </a>
            .
          </p>
          {showPdfPreview && (
            <iframe
              src={cvPdfUrl}
              className="h-[70vh] min-h-96 w-full rounded"
              title="Guy Green CV"
            />
          )}
        </div>
      </details>
    </div>
  );
};

export default CvPage;
