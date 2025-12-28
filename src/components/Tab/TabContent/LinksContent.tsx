import React from "react";

const LinksContent: React.FC = () => {
  const links = [
    {
      href: "https://www.chess.com/member/wowthisguyisamazing",
      imgSrc: require("../../../assets/images/chesscom-icon.png"),
      alt: "Chess.com Icon",
      label: "WowThisGuyIsAmazing on Chess.com",
    },
    {
      href: "https://lichess.org/@/guygreenInClassAtUCT",
      imgSrc: require("../../../assets/images/lichess-icon.png"),
      alt: "Lichess Icon",
      label: "GuyGreenInClassAtUCT on Lichess",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition-colors px-6 py-3 rounded-lg shadow w-full max-w-md"
        >
          <img src={link.imgSrc} alt={link.alt} className="w-10 h-10 object-contain" />
          <span className="font-semibold text-lg">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default LinksContent;
