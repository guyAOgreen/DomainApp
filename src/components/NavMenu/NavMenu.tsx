import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
      <button
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-lg border border-gray-600 p-3 text-xl transition hover:bg-gray-800 md:hidden"
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
                  `block rounded-md px-3 py-2 transition hover:bg-gray-800 hover:text-blue-300 ${
                    isActive
                      ? "bg-gray-800 text-blue-300 underline decoration-2 underline-offset-4"
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
