import React from 'react';

const CvPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-20 py-20">
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-12 text-center">Curriculum Vitae</h1>

      <section className="max-w-4xl mx-auto my-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Download or View My CV</h2>
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <iframe
            src={require('../../assets/cv/GuyGreenCV.pdf')}
            className="w-full h-[600px]"
            title="Guy Green CV"
            />
        </div>
        <div className="mt-4 text-center">
            <a
            href={require('../../assets/cv/GuyGreenCV.pdf')}
            download
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition"
            >
            Download CV (PDF)
            </a>
        </div>
        </section>

      {/* Education Section */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">University of Cape Town (UCT)</h3>
            <p className="italic">BSc Applied Maths & Computer Science, Honours in Computer Science — 2018</p>
          </div>
          {/* Add more education if needed */}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Professional Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">Oracle — Software Engineer</h3>
            <p className="italic">April 2020 – Present</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Worked on OCI (Oracle Cloud Infrastructure), Multicloud, and Edge Computing projects.</li>
              <li>Leveraged the following technologies and languages: Java, Python, Bash, Terraform, Ansible, TypeScript, React, Docker, Kubernetes, DropWizard.</li>
              <li>Collaborated with cross-functional teams to design scalable applications.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">ACI — Software Developer</h3>
            <p className="italic">2019 – April 2020</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Worked in the in-store team developing software solutions for client operations.</li>
              <li>Participated in full development lifecycle from requirements to deployment.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">React</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">TypeScript</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Node.js</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Java</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Python</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Docker</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">CSS / Tailwind</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">Cloud Computing</span>
        </div>
      </section>

      {/* Achievements / Interests Section */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Interests</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Chess player — represented province at junior level; currently play for Observatory Chess Club.</li>
          <li>Ambassador for GreenPoint Virgin Active Padel; actively participate in padel, running, and football.</li>
          <li>Avid F1 fan — participate in F1 Fantasy Game, following motorsport closely.</li>
        </ul>
      </section>

    </div>
  );
};

export default CvPage;