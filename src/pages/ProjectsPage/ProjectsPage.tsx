import dashboardScreenshot from "../../assets/images/projects/footybru-dashboard-demo.jpg";
import dashboardThumbnail from "../../assets/images/projects/footybru-dashboard-demo-thumbnail.jpg";
import landingPageScreenshot from "../../assets/images/projects/footybru-landing-page.jpg";
import landingPageThumbnail from "../../assets/images/projects/footybru-landing-page-thumbnail.jpg";
import statsScreenshot from "../../assets/images/projects/footybru-stats-demo.jpg";
import statsThumbnail from "../../assets/images/projects/footybru-stats-demo-thumbnail.jpg";
import teamBalancingScreenshot from "../../assets/images/projects/footybru-team-balancing.jpg";
import teamBalancingThumbnail from "../../assets/images/projects/footybru-team-balancing-thumbnail.jpg";
import ImageAlbum from "../../components/ImageAlbum/ImageAlbum";

const stack = [
  "Java 21",
  "Spring Boot",
  "PostgreSQL",
  "React",
  "TypeScript",
  "React Native",
  "Expo",
  "AWS",
];

const screenshots = [
  {
    src: landingPageScreenshot,
    thumbnailSrc: landingPageThumbnail,
    alt: "FootyBru landing page",
    caption: "A simple starting point for creating, joining, and managing football groups.",
  },
  {
    src: dashboardScreenshot,
    thumbnailSrc: dashboardThumbnail,
    alt: "FootyBru group dashboard",
    caption: "The group dashboard brings sessions, results, payments, and admin actions together.",
  },
  {
    src: statsScreenshot,
    thumbnailSrc: statsThumbnail,
    alt: "FootyBru player statistics",
    caption: "Player ratings, form, match records, and teammate insights in one view.",
  },
  {
    src: teamBalancingScreenshot,
    thumbnailSrc: teamBalancingThumbnail,
    alt: "FootyBru team balancing options",
    caption: "Configurable balancing strategies support different priorities for each session.",
  },
];

const ProjectsPage = () => (
  <div className="min-h-screen bg-gray-50 px-4 py-20 text-gray-900 dark:bg-gray-900 dark:text-white md:px-20">
    <header className="mx-auto mb-12 max-w-4xl text-center">
      <h1 className="mb-4 text-5xl font-extrabold">Projects</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        A selection of products I have designed and built across backend, web, and mobile.
      </p>
    </header>

    <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 px-6 py-10 text-white md:px-10">
        <p className="mb-2 text-sm font-semibold tracking-widest uppercase">Featured project</p>
        <h2 className="mb-3 text-4xl font-bold">FootyBru</h2>
        <p className="max-w-3xl text-lg">
          A platform for running five-a-side football groups, from player sign-ups and session
          management to balanced teams, match results, statistics, and payments.
        </p>
        <a
          href="https://www.footybru.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit FootyBru (opens in a new tab)"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-5 py-2.5 font-semibold text-blue-700 shadow-md transition hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Visit FootyBru
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="space-y-10 p-6 md:p-10">
        <section>
          <h3 className="mb-3 text-2xl font-semibold">My role</h3>
          <p className="text-gray-700 dark:text-gray-300">
            I am the creator and sole contributor, responsible for the product design, backend, web
            experience, mobile development, testing, and AWS deployment.
          </p>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold">Current status</h3>
          <ul className="grid gap-4 md:grid-cols-3">
            <li className="rounded-lg border border-green-500/40 bg-green-50 p-4 dark:bg-green-950/30">
              <strong className="block text-green-700 dark:text-green-300">Backend — Live</strong>
              <span>Deployed on AWS Elastic Beanstalk.</span>
            </li>
            <li className="rounded-lg border border-green-500/40 bg-green-50 p-4 dark:bg-green-950/30">
              <strong className="block text-green-700 dark:text-green-300">Web app — Live</strong>
              <span>Deployed with AWS Amplify.</span>
            </li>
            <li className="rounded-lg border border-blue-500/40 bg-blue-50 p-4 dark:bg-blue-950/30">
              <strong className="block text-blue-700 dark:text-blue-300">
                Mobile app — In development
              </strong>
              <span>Building native iOS and Android experiences with Expo.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold">Technology</h3>
          <ul className="flex flex-wrap gap-3" aria-label="FootyBru technology stack">
            {stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-gray-700"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-2xl font-semibold">Technical highlights</h3>
          <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>Designed a Spring Boot REST API backed by PostgreSQL.</li>
            <li>Built configurable team balancing using player ratings and group preferences.</li>
            <li>
              Extracted shared typed API and domain logic for use across the web and mobile apps.
            </li>
            <li>
              Developed automated tests across the backend, web, shared core, and mobile code.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold">Product gallery</h3>
          <ImageAlbum images={screenshots} thumbnailsLabel="Choose a FootyBru screenshot" />
        </section>
      </div>
    </article>
  </div>
);

export default ProjectsPage;
