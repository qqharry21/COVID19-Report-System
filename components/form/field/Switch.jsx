/** @format */

import React, { useState } from 'react';

const Switch = ({ id, name, label }) => {
  const [value, setValue] = useState(false);
  const labelOff = getLabelByValue(label, false);
  const labelOn = getLabelByValue(label, true);
  const data = getLabelByValue(label, value);
  const handleToggle = () => {
    setValue(prev => !prev);
  };
  return (
    <div className='flex items-center mb-4'>
      <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300 '>{labelOff}</span>
      <label htmlFor={id} className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          id={id}
          className='sr-only peer'
          name={name}
          value={data}
          checked={value}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-teal-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main"></div>
      </label>
      <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>{labelOn}</span>
    </div>
  );
};

function getLabelByValue(array, value) {
  return array.find(object => object.value === value).label;
}

export { Switch };
