import { useId } from "react";
import type { Project, ProjectStatus } from "../../data/projects";
import ImageAlbum from "../ImageAlbum/ImageAlbum";

const statusStyles: Record<ProjectStatus["state"], { card: string; text: string }> = {
  Live: {
    card: "border-green-500/40 bg-green-50 dark:bg-green-950/30",
    text: "text-green-700 dark:text-green-300",
  },
  "In development": {
    card: "border-blue-500/40 bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-300",
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
    >
      <div className="bg-gradient-to-r from-blue-700 to-green-600 px-6 py-10 text-white md:px-10">
        {project.featured && (
          <p className="mb-2 text-sm font-semibold tracking-widest uppercase">Featured project</p>
        )}
        <h2 id={headingId} className="mb-3 text-4xl font-bold">
          {project.title}
        </h2>
        <p className="max-w-3xl text-lg">{project.description}</p>
        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-5 py-2.5 font-semibold text-blue-700 shadow-md transition hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-10 p-6 md:p-10">
        {project.role && (
          <section>
            <h3 className="mb-3 text-2xl font-semibold">My role</h3>
            <p className="text-gray-700 dark:text-gray-300">{project.role}</p>
          </section>
        )}

        {project.status.length > 0 && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Current status</h3>
            <ul className="grid gap-4 md:grid-cols-3">
              {project.status.map((status) => (
                <li
                  key={status.name}
                  className={`rounded-lg border p-4 ${statusStyles[status.state].card}`}
                >
                  <strong className={`block ${statusStyles[status.state].text}`}>
                    {status.name} — {status.state}
                  </strong>
                  <span>{status.description}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.stack.length > 0 && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Technology</h3>
            <ul className="flex flex-wrap gap-3" aria-label={`${project.title} technology stack`}>
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-gray-700"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section>
            <h3 className="mb-3 text-2xl font-semibold">Technical highlights</h3>
            <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {project.images.length > 0 && (
          <section>
            <h3 className="mb-4 text-2xl font-semibold">Product gallery</h3>
            <ImageAlbum
              images={project.images}
              thumbnailsLabel={`Choose a ${project.title} screenshot`}
            />
          </section>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
