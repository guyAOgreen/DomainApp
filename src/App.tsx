import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import Home from './pages/HomePage/HomePage';
import './App.css';
import NameComponent from './components/NameComponent/NameComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div className='top-layer'>
        <NameComponent/>
        <NavMenu />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<Home />} />
        <Route path="/cv" element={<Home />} />
      </Routes> 
      
    </Router>
  );
};

export default App;