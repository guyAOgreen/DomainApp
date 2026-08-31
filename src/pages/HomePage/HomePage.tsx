import React from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../constants/routeConstants";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <section className="px-4 py-20 text-center md:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-2xl font-semibold text-blue-700 md:text-3xl dark:text-blue-300">
            Hi, I&apos;m Guy Green
          </p>
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
            Full-stack developer and independent product builder
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-700 md:text-xl dark:text-gray-300">
            I build practical products across backend, web, and mobile—from initial product
            decisions through testing and deployment. I bring experience from payment-processing
            software at ACI and multiple cloud projects at Oracle to the independent products I am
            building now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={appRoutes.projects}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-800"
            >
              Explore my projects
            </Link>
            <Link
              to={appRoutes.cv}
              className="rounded-lg border border-blue-700 px-6 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-700 hover:text-white dark:border-blue-300 dark:text-blue-300"
            >
              View My CV
            </Link>
            <Link
              to={appRoutes.aboutMe}
              className="rounded-lg px-6 py-3 font-semibold text-gray-700 underline decoration-2 underline-offset-4 transition hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
            >
              More about me
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-20" aria-labelledby="featured-project-heading">
        <article className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-[2fr_1fr] dark:bg-gray-800">
          <div className="p-8 md:p-10">
            <p className="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-300">
              Featured project
            </p>
            <h2 id="featured-project-heading" className="mb-4 text-4xl font-bold">
              FootyBru
            </h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              A platform I designed and built to make running five-a-side football groups easier,
              bringing player sign-ups, sessions, balanced teams, results, statistics, and payments
              together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={appRoutes.projects}
                className="rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white shadow transition hover:bg-green-800"
              >
                See the FootyBru project
              </Link>
              <a
                href="https://www.footybru.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit FootyBru (opens in a new tab)"
                className="rounded-lg border border-gray-400 px-5 py-2.5 font-semibold transition hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-700"
              >
                Visit FootyBru <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-blue-700 to-green-600 p-8 text-white md:p-10">
            <p className="mb-3 text-sm font-semibold tracking-widest uppercase">Built end to end</p>
            <p className="text-xl font-semibold">
              Product design, backend, web, mobile, testing, and AWS deployment.
            </p>
          </div>
        </article>
      </section>

      <section className="bg-white px-4 py-20 md:px-20 dark:bg-gray-800">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-4xl font-bold">What I bring to a product</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-xl bg-gray-100 p-6 shadow dark:bg-gray-700">
              <h3 className="mb-3 text-2xl font-semibold">Product ownership</h3>
              <p>
                As FootyBru&apos;s creator and sole contributor, I make the product and technical
                decisions and carry them through to a working service.
              </p>
            </article>
            <article className="rounded-xl bg-gray-100 p-6 shadow dark:bg-gray-700">
              <h3 className="mb-3 text-2xl font-semibold">Full-stack delivery</h3>
              <p>
                I work across Java and Spring Boot services, PostgreSQL, React, TypeScript, React
                Native, automated testing, and AWS deployment.
              </p>
            </article>
            <article className="rounded-xl bg-gray-100 p-6 shadow dark:bg-gray-700">
              <h3 className="mb-3 text-2xl font-semibold">Industry experience</h3>
              <p>
                My professional background spans payment processing at ACI and work across multiple
                cloud projects at Oracle.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-20" aria-labelledby="beyond-code-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="beyond-code-heading" className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Beyond the code
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700 dark:text-gray-300">
            The interests that keep me competitive, curious, and away from a screen occasionally.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-2xl font-semibold">Chess and strategy</h3>
              <p className="text-gray-700 dark:text-gray-300">
                I enjoy challenging myself through chess and strategic thinking. I play for
                Observatory Chess Club in the Cape Town league.
              </p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-3 text-2xl font-semibold">Sport and movement</h3>
              <p className="text-gray-700 dark:text-gray-300">
                I stay active through padel, running, and five-a-side football. Padel is my main
                sport at the moment, and I am an ambassador for Epicenter Virgin Active Padel.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center md:px-20">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Want to Connect?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Whether it’s for work, collaboration, or just a friendly chat, feel free to reach out!
        </p>
        <a
          href="mailto:guygreen.dev@gmail.com"
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow transition hover:bg-green-800"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
};

export default HomePage;
