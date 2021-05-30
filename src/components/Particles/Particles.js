import React from 'react';
import Particles from 'react-particles-js';

export default () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}
  >
    <Particles
      params={{
        fpsLimit: 60,
        background: {
          color: '#ffff',
        },
        backgroundMode: {
          enable: true,
        },
        particles: {
          color: {
            value: ['#f67e7d', '#843b62', '#621940'],
          },
          links: {
            color: '#ffb997',
            enable: true,
          },
          move: {
            enable: true,
            speed: 6,
          },
          size: {
            value: 8,
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 2.5,
              minimumValue: 1,
            },
          },
          opacity: {
            value: 1.2,
            random: {
              enable: true,
              minimumValue: 0.4,
            },
          },
        },
      }}
    />
  </div>
);
