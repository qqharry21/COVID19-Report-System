/** @format */

import React from 'react';

const Range = () => {
  return (
    <div className='relative pt-1'>
      <input
        type='range'
        list='tickmarks'
        min='1'
        max='6'
        step='1'
        className='w-full focus:!ring-0 bg-main appearance-none h-1 rounded-lg items-center'
        name='range'
      />
      <datalist id='tickmarks'>
        <option value='1'></option>
        <option value='2'></option>
        <option value='3'></option>
        <option value='4'></option>
        <option value='5'></option>
        <option value='6'></option>
      </datalist>
    </div>
  );
};

export default Range;
