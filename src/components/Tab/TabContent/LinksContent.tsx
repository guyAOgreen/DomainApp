import React from "react";
import chessComIcon from "../../../assets/images/chesscom-icon.png";
import lichessIcon from "../../../assets/images/lichess-icon.png";

const LinksContent: React.FC = () => {
  const links = [
    {
      href: "https://www.chess.com/member/wowthisguyisamazing",
      imgSrc: chessComIcon,
      label: "WowThisGuyIsAmazing on Chess.com",
    },
    {
      href: "https://lichess.org/@/guygreenInClassAtUCT",
      imgSrc: lichessIcon,
      label: "GuyGreenInClassAtUCT on Lichess",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Find Me Online</h2>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gray-200 dark:bg-gray-700 hover:bg-blue-700 hover:text-white transition-colors px-6 py-3 rounded-lg shadow w-full max-w-md"
        >
          <img src={link.imgSrc} alt="" className="w-10 h-10 object-contain" />
          <span className="font-semibold text-lg">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </a>
      ))}
    </div>
  );
};

export default LinksContent;
