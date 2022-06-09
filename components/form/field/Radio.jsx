/** @format */

import React from 'react';

// const Radio = ({ title, name, id }) => {
//   return (
//     <div>
//       <input
//         className='text-sm font-medium transition-all duration-200 ease-in-out'
//         id={id}
//         type='radio'
//         name={name}
//       />
//       <label htmlFor={id} className='block w-full p-3 border border-gray-200 rounded-lg'>
//         <span className='text-sm font-medium'> {title} </span>
//       </label>
//     </div>
//   );
// };

const RadioLarge = ({ title, name, id }) => {
  return (
    <div>
      <input
        className='hidden peer'
        type='radio'
        name='shippingOption'
        value='standard'
        id='standard'
      />

      <label
        className='flex items-center justify-between p-4 text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-main hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-main'
        htmlFor='standard'>
        <span> Standard </span>

        <span> Free </span>
      </label>
    </div>
  );
};

const RadioCheck = ({ title, field, text, name, id, formik }) => {
  return (
    <>
      <input
        className='hidden group peer'
        type='radio'
        name={name}
        id={id}
        {...formik.getFieldProps(field.name)}
      />

      <label
        className='block p-4 text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-main hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-main'
        htmlFor={id}>
        <span> {title} </span>

        <span className='block mt-1 text-xs text-gray-500'>{text}</span>
      </label>

      <svg
        className='absolute w-5 h-5 text-teal-600 opacity-0 top-4 right-4 peer-checked:opacity-100'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
          clipRule='evenodd'
        />
      </svg>
    </>
  );
};

const Radio = element => {
  return (
    <div className=''>
      <p className='mb-1 text-sm font-medium'>
        {element.label}
        {element.isRequired && <span className='ml-1 text-lg font-medium text-red-500'>*</span>}
      </p>

      <div className='grid grid-cols-4 gap-4'>
        {element.options?.map((attr, index) => {
          let option = React.cloneElement(element.radio, element);
          option = React.cloneElement(option, attr);
          return (
            <div key={index} className='relative'>
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Radio, RadioLarge, RadioCheck };
