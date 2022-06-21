/** @format */

import React, { Children } from 'react';

const Dashboard = ({ children, ...props }) => {
  const checkChild = children => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, { user: props.user });
    }
    return children;
  };
  const childrenArray = Children.toArray(children);
  const currentChild = checkChild(childrenArray[props.step]);

  return <div className='w-full h-full p-4 sm:p-6'>{currentChild}</div>;
};

export default Dashboard;
