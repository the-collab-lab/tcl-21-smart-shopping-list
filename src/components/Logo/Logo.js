import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import smartShopper from './smart-shopper.png';

const Logo = () => {
  return (
    <div className="'ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img
            style={{ paddingTop: '0px' }}
            src={smartShopper}
            alt="smart-shopper-logo"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
