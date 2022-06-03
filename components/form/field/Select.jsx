/** @format */

import React, { useId } from 'react';
import { getErrorMessage, getErrors } from '../../../utils/validate';

const Select = ({ field, label, options, name, isRequired, formik, valueOption }) => {
  const showErrors = getErrors(formik, field) && isRequired;
  const error = getErrorMessage(formik, field);
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
        {label}
        {isRequired && <span className='text-red-500 font-medium text-base ml-1'>*</span>}
      </label>
      <select
        id={id}
        name={name}
        className={`${showErrors ? 'border-red-500 border-2' : ''} select`}
        required={isRequired}
        {...formik.getFieldProps(field.name)}>
        <option value='' disabled>
          請選擇{label}
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={valueOption ? option.value : option.name}>
              {option.name}
            </option>
          );
        })}
        {/* option 的 value 可加或不加 */}
      </select>
      {showErrors ? <p className='text-red-500 text-xs mt-1 font-medium'>{error}</p> : null}
    </div>
  );
};

export { Select };
