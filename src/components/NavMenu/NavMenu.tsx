import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

const NavMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route?: string) => {
    route ? navigate(`/${route}`) : navigate("/")
  }

  return (
    <nav className="nav-menu">
      <div>
        <>
          <button 
            onClick={() => handleNavigation()}
            title='home'
            className='button-text button'
          >
            {"Home"}
          </button>
          <button 
            onClick={() => handleNavigation("about-me")}
            title='about-me'
            className='button-text button'
          >
            {"About me"}
          </button>
          <button 
            onClick={() => handleNavigation("cv")}
            title='cv'
            className='button-text button'
          >
            {"CV"}
          </button>
          <button 
            onClick={() => handleNavigation("chess")}
            title='chess'
            className='button-text button'
          >
            {"Chess"}
          </button>
        </>
      </div>
    </nav>
  );
};

export default NavMenu;
