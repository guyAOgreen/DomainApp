import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import HomePage from './pages/HomePage/HomePage';
import './App.css';
import NameComponent from './components/NameComponent/NameComponent';
import AboutMePage from './pages/AboutMePage/AboutMePage';
import CvPage from './pages/CVPage/CVPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className='top-layer'>
        <NameComponent/>
        <NavMenu />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/cv" element={<CvPage/>} />
      </Routes> 
      
    </Router>
  );
};

export default App;