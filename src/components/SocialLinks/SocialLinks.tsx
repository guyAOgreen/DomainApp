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
    name: "github",
    href: "https://github.com/guyAOgreen",
    icon: FaGithub,
  },
  {
    name: "linkedIn",
    href: "https://linkedin.com/in/guy-green-ba3a59140",
    icon: FaLinkedin,
  },
  {
    name: "instagram",
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
            className={"text-gray-600 dark:text-gray-300 hover:text-blue-600"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={24} />
          </a>
        );
      })}
    </>
  );
};

export default SocialLinks;
