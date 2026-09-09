import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../data/projects";

const ProjectsPage = () => (
  <div className="min-h-screen bg-gray-50 px-4 py-20 text-gray-900 dark:bg-gray-900 dark:text-white md:px-20">
    <header className="mx-auto mb-12 max-w-4xl text-center">
      <h1 className="mb-4 text-5xl font-extrabold">Projects</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        A selection of products I have designed and built across backend, web, and mobile.
      </p>
    </header>

    <div className="mx-auto max-w-5xl space-y-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default ProjectsPage;
