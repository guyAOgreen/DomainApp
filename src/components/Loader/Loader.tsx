import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;