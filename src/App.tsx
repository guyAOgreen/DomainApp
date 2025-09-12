import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import HomePage from './pages/HomePage/HomePage';
import NameComponent from './components/NameComponent/NameComponent';
import AboutMePage from './pages/AboutMePage/AboutMePage';
import CvPage from './pages/CVPage/CVPage';
import ChessPage from './pages/ChessPage/ChessPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-wrap items-center justify-between p-4 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 shadow-lg">
        <NameComponent />
        <NavMenu />
      </div>

      <main className="p-6 bg-gray-50 dark:bg-gray-900" >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="/chess" element={<ChessPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;