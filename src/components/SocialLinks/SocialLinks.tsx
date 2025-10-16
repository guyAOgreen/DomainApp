import React, { ReactNode } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";


export const socialIcons = [
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
    {socialIcons.map((socialIcon) => {
            const Icon = socialIcon.icon;

   return (
     <li key={socialIcon.name}>
       <a 
        className={"text-gray-600 dark:text-gray-300 hover: text-blue-600"} 
        href={socialIcon.href}>
            {Icon as unknown as ReactNode}
       </a>
    </li>
   );
})}
   </>

  );
};

export default SocialLinks;