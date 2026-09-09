import dashboardScreenshot from "../assets/images/projects/footybru-dashboard-demo.jpg";
import dashboardThumbnail from "../assets/images/projects/footybru-dashboard-demo-thumbnail.jpg";
import landingPageScreenshot from "../assets/images/projects/footybru-landing-page.jpg";
import landingPageThumbnail from "../assets/images/projects/footybru-landing-page-thumbnail.jpg";
import statsScreenshot from "../assets/images/projects/footybru-stats-demo.jpg";
import statsThumbnail from "../assets/images/projects/footybru-stats-demo-thumbnail.jpg";
import teamBalancingScreenshot from "../assets/images/projects/footybru-team-balancing.jpg";
import teamBalancingThumbnail from "../assets/images/projects/footybru-team-balancing-thumbnail.jpg";
import type { ImageAlbumItem } from "../components/ImageAlbum/ImageAlbum";

export type ProjectStatus = {
  name: string;
  state: "Live" | "In development";
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  images: ImageAlbumItem[];
  links: { label: string; href: string }[];
  status: ProjectStatus[];
  featured?: boolean;
  role?: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: "footybru",
    title: "FootyBru",
    featured: true,
    description:
      "A platform for running five-a-side football groups, from player sign-ups and session management to balanced teams, match results, statistics, and payments.",
    links: [{ label: "Visit FootyBru", href: "https://www.footybru.com" }],
    role: "I am the creator and sole contributor, responsible for the product design, backend, web experience, mobile development, testing, and AWS deployment.",
    status: [
      { name: "Backend", state: "Live", description: "Deployed on AWS Elastic Beanstalk." },
      { name: "Web app", state: "Live", description: "Deployed with AWS Amplify." },
      {
        name: "Mobile app",
        state: "In development",
        description: "Building native iOS and Android experiences with Expo.",
      },
    ],
    stack: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "AWS",
    ],
    highlights: [
      "Designed a Spring Boot REST API backed by PostgreSQL.",
      "Built configurable team balancing using player ratings and group preferences.",
      "Extracted shared typed API and domain logic for use across the web and mobile apps.",
      "Developed automated tests across the backend, web, shared core, and mobile code.",
    ],
    images: [
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
        caption:
          "The group dashboard brings sessions, results, payments, and admin actions together.",
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
    ],
  },
];
