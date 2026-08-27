import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import HomePage from "./pages/HomePage/HomePage";
import NameComponent from "./components/NameComponent/NameComponent";
import AboutMePage from "./pages/AboutMePage/AboutMePage";
import CvPage from "./pages/CVPage/CVPage";
import ChessPage from "./pages/ChessPage/ChessPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import SocialLinks from "./components/SocialLinks/SocialLinks";
import { appRoutes } from "./constants/routeConstants";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-wrap items-center justify-between p-4 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 shadow-lg">
        <NameComponent />
        <NavMenu />
      </div>

      <main className="p-6 bg-gray-50 dark:bg-gray-900">
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
    </Router>
  );
};

export default App;
