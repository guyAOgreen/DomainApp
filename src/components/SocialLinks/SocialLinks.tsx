import React from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

type SocialIcon = {
  name: string;
  href: string;
  icon: IconType;
};

export const socialIcons: SocialIcon[] = [
  {
    name: "GitHub",
    href: "https://github.com/guyAOgreen",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/guy-green-ba3a59140",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/guygreenforreal",
    icon: FaInstagram,
  },
];

const SocialLinks: React.FC = () => {
  return (
    <>
      {socialIcons.map(({ name, href, icon: Icon }) => {
        return (
          <a
            key={name}
            href={href}
            aria-label={`${name} (opens in a new tab)`}
            className="rounded-sm text-gray-300 transition hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={24} aria-hidden="true" />
          </a>
        );
      })}
    </>
  );
};

export default SocialLinks;
