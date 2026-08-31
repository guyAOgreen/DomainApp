import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import HomePage from "./pages/HomePage/HomePage";
import NameComponent from "./components/NameComponent/NameComponent";
import AboutMePage from "./pages/AboutMePage/AboutMePage";
import CvPage from "./pages/CVPage/CVPage";
import ChessPage from "./pages/ChessPage/ChessPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import { appRoutes } from "./constants/routeConstants";

const routeNames: Record<string, string> = {
  [appRoutes.home]: "Home",
  [appRoutes.aboutMe]: "About Me",
  [appRoutes.projects]: "Projects",
  [appRoutes.cv]: "Curriculum Vitae",
  [appRoutes.chess]: "My Chess Life",
};

const AppContent: React.FC = () => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  const [routeAnnouncement, setRouteAnnouncement] = useState("");

  useEffect(() => {
    const routeName = routeNames[pathname] ?? "Page not found";
    document.title = `${routeName} — Guy Green`;
    setRouteAnnouncement(`${routeName} page loaded`);

    if (previousPath.current !== pathname) {
      mainRef.current?.focus();
    }
    previousPath.current = pathname;
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900"
      >
        Skip to main content
      </a>
      <header className="flex flex-wrap items-center justify-between gap-3 bg-gray-900 p-4 text-white shadow-lg dark:bg-gray-50 dark:text-gray-900">
        <NameComponent />
        <NavMenu />
      </header>

      <p role="status" className="sr-only">
        {routeAnnouncement}
      </p>

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="p-6 bg-gray-50 dark:bg-gray-900"
      >
        <Routes>
          <Route path={appRoutes.home} element={<HomePage />} />
          <Route path={appRoutes.aboutMe} element={<AboutMePage />} />
          <Route path={appRoutes.projects} element={<ProjectsPage />} />
          <Route path={appRoutes.cv} element={<CvPage />} />
          <Route path={appRoutes.chess} element={<ChessPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">© {new Date().getFullYear()} Guy Green</p>
          <div className="flex justify-center space-x-4">
            <SocialLinks />
          </div>
        </div>
      </footer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
