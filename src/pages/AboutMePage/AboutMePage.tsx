import React from "react";

const AboutMePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-20 py-20">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-center">About Me</h1>

      {/* TL;DR Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">TL;DR</h2>
        <p className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          My name is Guy Green, and I am a fullstack software developer. I studied Applied Maths and
          Computer Science at UCT and completed my honours in Computer Science in 2018. I started my
          first full-time role at ACI in 2019, moved to Oracle in 2020, and have worked on OCI,
          Multicloud, and Edge Computing projects since then.
        </p>
      </section>

      {/* Personal & Interests Section */}
      <section className="max-w-4xl mx-auto mb-12 space-y-6">
        <p>
          I enjoy staying active and spending time outdoors. My main sports are padel, running, and
          football — I am even an ambassador for GreenPoint Virgin Active Padel. Other sports I
          enjoy include cricket, touch rugby, and squash.
        </p>
        <p>
          When it comes to spectating, I’m an avid F1 fan and participate in the F1 Fantasy Game
          (aiming for first place in South Africa!). I also enjoy following test cricket, rugby,
          football, cycling, and padel tournaments.
        </p>
        <p>
          I am a dedicated chess player, having represented my province at junior level, and
          currently play for the Observatory Chess Club in the Western Cape/Cape Town League.
        </p>
        <p>
          Outside of sports and chess, I enjoy spending time with friends, attending quiz nights,
          go-karting, and relaxing in nature.
        </p>
      </section>

      {/* Image Gallery */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "chessImage.jpg"].map((imgName, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={require(`../../assets/images/${imgName}`)}
              alt={`About Me ${idx + 1}`}
              className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutMePage;
