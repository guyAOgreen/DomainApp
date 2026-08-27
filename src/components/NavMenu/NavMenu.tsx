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
      alt="Jumping Cat"
      className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900"
    />
    <nav className="flex gap-6 text-lg">
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === appRoutes.home}
          className={({ isActive }) =>
            `transition hover:text-blue-400 ${isActive ? "text-blue-400 underline decoration-2 underline-offset-8" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </>
);

export default NavMenu;
