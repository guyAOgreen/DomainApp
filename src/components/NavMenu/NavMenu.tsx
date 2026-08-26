import { NavLink } from "react-router-dom";
import catGif from "../../assets/gifs/cat.gif";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-me" },
  { label: "CV", to: "/cv" },
  { label: "Chess", to: "/chess" },
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
          end={to === "/"}
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
