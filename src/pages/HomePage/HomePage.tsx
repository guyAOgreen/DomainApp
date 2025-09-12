import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Hi, I'm Guy Green
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
          I'm a software developer passionate about building clean, efficient, and user-friendly applications. When I'm not coding, you can find me playing chess, being active with exercise, or exploring new technologies.
        </p>
        <div className="flex gap-4">
          <a
            href="/about-me"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition"
          >
            Learn More About Me
          </a>
          <a
            href="/cv"
            className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-600 hover:text-white transition"
          >
            View My CV
          </a>
        </div>
      </section>

      {/* Skills & Interests Section */}
      <section className="py-20 px-4 md:px-20 bg-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-center">My Skills & Interests</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Software Development</h3>
            <p>Experienced in React, TypeScript, Node.js, Java, Python and building full-stack applications.</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Chess & Strategy</h3>
            <p>I enjoy challenging myself with chess and strategic thinking, which also improves problem-solving skills in development.</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Continuous Learning</h3>
            <p>Always exploring new technologies, frameworks, and techniques to stay current and improve my craft.</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Exercise & Sports</h3>
            <p>I enjoy staying active with padel, running, and football — which keeps me energized and balanced both mentally and physically.</p>
          </div>
        </div>
      </section>

      {/* Contact / Call-to-Action */}
      <section className="py-20 px-4 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Connect?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Whether it’s for work, collaboration, or just a friendly chat, feel free to reach out!
        </p>
        <a
          href="mailto:guygreen.dev@gmail.com"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500 transition"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
};

export default HomePage;