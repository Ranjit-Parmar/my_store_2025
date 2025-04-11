import React from 'react';

const Spinner = () => {
    return (
      <div className="spinner-container">
        <div className="spinner-circle">
          <div className="arc arc1"></div>
          <div className="arc arc2"></div>
          <div className="arc arc3"></div>
        </div>
        <div className="spinner-text">Loading...</div>
      </div>
    );
  };
  
export default Spinner;
