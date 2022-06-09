/** @format */

import React from 'react';

const Bar = ({ animationDuration, progress }) => {
  return (
    <div
      className='fixed top-0 left-0 z-50 w-full h-1 bg-teal-500'
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear `,
      }}></div>
  );
};

export default Bar;
