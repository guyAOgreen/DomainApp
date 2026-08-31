import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import catGif from "../../assets/gifs/cat.gif";
import { appRoutes } from "../../constants/routeConstants";

const navItems = [
  { label: "Home", to: appRoutes.home },
  { label: "About", to: appRoutes.aboutMe },
  { label: "Projects", to: appRoutes.projects },
  { label: "CV", to: appRoutes.cv },
  { label: "Chess", to: appRoutes.chess },
];

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={catGif}
        alt=""
        className="hidden h-14 w-14 rounded-full border-4 border-white dark:border-gray-900 motion-safe:lg:block"
      />
      <button
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-lg border border-gray-600 p-3 text-xl transition hover:bg-gray-700 dark:border-gray-300 dark:hover:bg-gray-200 md:hidden"
      >
        {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        className={`${isOpen ? "block" : "hidden"} order-last w-full md:order-none md:block md:w-auto`}
      >
        <ul className="flex flex-col gap-1 pt-3 text-base md:flex-row md:items-center md:gap-2 md:pt-0 lg:gap-4 lg:text-lg">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === appRoutes.home}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 transition hover:bg-gray-700 hover:text-blue-300 dark:hover:bg-gray-200 dark:hover:text-blue-700 ${
                    isActive
                      ? "bg-gray-800 text-blue-300 underline decoration-2 underline-offset-4 dark:bg-gray-100 dark:text-blue-700"
                      : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
