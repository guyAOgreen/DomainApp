import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cvPdfUrl } from "../../constants/assetConstants";
import { appRoutes } from "../../constants/routeConstants";

const skillGroups = [
  { name: "Programming", skills: ["Java", "Python", "TypeScript", "SQL"] },
  { name: "Frontend", skills: ["React", "Vite", "Yarn", "Oracle JET"] },
  {
    name: "Backend",
    skills: ["Spring Boot", "Spring Security", "JPA/Hibernate", "Dropwizard", "REST APIs", "Maven"],
  },
  { name: "Databases", skills: ["PostgreSQL", "Oracle Database"] },
  { name: "Cloud", skills: ["AWS", "OCI"] },
  { name: "Infrastructure", skills: ["Docker", "Terraform", "Kubernetes", "nginx"] },
  {
    name: "Delivery & operations",
    skills: ["GitHub Actions", "Jenkins", "Grafana", "CI/CD", "On-call"],
  },
];

const experience = [
  {
    title: "Independent Software Engineer",
    dates: "July 2026 – Present",
    summary: "Self-directed product development, based in Cape Town and working remotely.",
    highlights: [
      "Designing and building FootyBru, a five-a-side football platform with a Spring Boot/PostgreSQL backend and React/TypeScript frontend.",
      "Own the full lifecycle from domain modelling and REST API design to deployment on AWS Elastic Beanstalk, RDS and Amplify.",
      "Administer personal OCI infrastructure, including this nginx-served site with automated GitHub Actions deployments.",
    ],
  },
  {
    title: "Oracle — Senior Software Developer (IC3)",
    dates: "April 2020 – June 2026",
    summary:
      "Promoted from Software Developer (IC2) to Senior Software Developer (IC3), working across application migration, infrastructure visualisation, multicloud databases and edge/cloud-at-customer products.",
    highlights: [
      "Led features from design through release and production support, serving as a primary code reviewer across frontend and backend repositories.",
      "Drove the redesign of a live Oracle Database–Azure adaptor: led API specification changes, implemented VM cluster provisioning APIs and built the foundational Dropwizard scaffolding.",
      "Contributed to high-availability and authorisation improvements, rolled out new cloud regions for general availability and supported the launch-day war room.",
      "Expanded edge-device shipping support from 2 to 200+ countries and designed an error-handling framework adopted across 7 console plugins.",
      "Built an internal environment-setup CLI, selected testing frameworks for two new UIs and migrated repositories and build pipelines.",
      "Mentored two engineers to become primary code reviewers, ran sprint planning, retrospectives and engineering office hours, and conducted hiring interviews.",
    ],
  },
  {
    title: "ACI Worldwide — Associate Software Engineer",
    dates: "January 2019 – March 2020",
    summary: "Worked in the in-store payments division in Cape Town.",
    highlights: [
      "Developed eSocket.POS integrations for card-payment devices and upstream software, including a screen interface for card-machine payments.",
      "Supported devices and drivers on-call, created patch releases and improved production software.",
      "Contributed to mapping Postilion fields to Mastercard and Visa fields, working with Java, Python, SQL, Jenkins, Perforce and automated testing.",
    ],
  },
];

const CvPage: React.FC = () => {
  const { hash } = useLocation();
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);
  const pdfPreviewRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    if (hash === "#cv-preview" && pdfPreviewRef.current) {
      pdfPreviewRef.current.open = true;
    }
  }, [hash]);

  React.useEffect(() => {
    if (hash === "#cv-preview" && showPdfPreview) {
      // Wait for the iframe to render so scrolling can reach the expanded preview.
      pdfPreviewRef.current?.querySelector("summary")?.scrollIntoView();
    }
  }, [hash, showPdfPreview]);

  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-gray-50 px-4 py-10 text-gray-900 md:px-10 md:py-14 dark:bg-gray-900 dark:text-white">
      <header className="mb-10 flex flex-col gap-6 border-b border-gray-200 pb-8 lg:flex-row lg:items-start lg:justify-between dark:border-gray-700">
        <div>
          <h1 className="mb-3 text-4xl font-extrabold md:text-5xl">Curriculum Vitae</h1>
          <p className="max-w-xl text-lg text-gray-700 dark:text-gray-300">
            Senior software engineer working across the full stack, with a background in enterprise
            software, cloud services and payment systems. Now building independent products from
            design through deployment.
          </p>
          <p className="mt-3 max-w-xl text-gray-700 dark:text-gray-300">
            Open to full-stack, backend or platform-oriented roles, and to relocation locally or
            internationally.
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
            {experience.map((role) => (
              <div key={role.title}>
                <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4">
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  <p className="shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {role.dates}
                  </p>
                </div>
                <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  {role.summary}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-gray-700 dark:text-gray-300">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cv-skills-heading">
          <h2 id="cv-skills-heading" className="mb-5 text-2xl font-semibold">
            Skills
          </h2>
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        <section aria-labelledby="cv-projects-heading">
          <h2 id="cv-projects-heading" className="mb-5 text-2xl font-semibold">
            Selected projects
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-bold">FootyBru</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  April 2026 – Present
                </p>
              </div>
              <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                Built around a real weekly five-a-side workflow, covering guests, waitlists, payment
                responsibility and recurring sessions. Uses Docker for local integration testing,
                including database migration tests against PostgreSQL.
              </p>
              <Link
                to={appRoutes.projects}
                className="mt-2 inline-block font-semibold text-blue-700 underline dark:text-blue-300"
              >
                More about FootyBru
              </Link>
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xl font-bold">guygreen.dev</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  September 2024 – Present
                </p>
              </div>
              <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                This React, Vite and TypeScript site is self-hosted on OCI behind nginx, with
                automated GitHub Actions deployments. The CV and personal photos are served from OCI
                Object Storage.
              </p>
            </div>
          </div>
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
            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Honours project: PTR (Propositional Typicality Reasoning), an implementation for
              reasoning with Propositional Typicality Logic.
            </p>
          </section>

          <section aria-labelledby="cv-achievements-heading">
            <h2 id="cv-achievements-heading" className="mb-5 text-2xl font-semibold">
              Selected achievements
            </h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 dark:text-gray-300">
              <li>Oracle F1 Fantasy League winner — 2023, 2024 and 2025.</li>
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
