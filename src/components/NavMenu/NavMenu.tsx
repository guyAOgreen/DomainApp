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

const NavMenu = () => (
  <>
    <img
      src={catGif}
      alt=""
      aria-hidden="true"
      className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900"
    />
    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-lg">
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === appRoutes.home}
          className={({ isActive }) =>
            `transition hover:text-blue-300 dark:hover:text-blue-700 ${isActive ? "text-blue-300 dark:text-blue-700 underline decoration-2 underline-offset-8" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </>
);

export default NavMenu;
