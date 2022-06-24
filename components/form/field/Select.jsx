/** @format */

import React, { useId } from 'react';
import { getErrorMessage, getErrors } from '../../../utils/validate';

const Select = ({ field, label, options, name, isRequired, formik, valueOption, disabled }) => {
  const showErrors = getErrors(formik, field) && isRequired;
  const error = getErrorMessage(formik, field);

  const id = useId();
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
        {label}
        {isRequired && <span className='ml-1 text-base font-medium text-red-500'>*</span>}
      </label>
      <select
        id={id}
        name={name}
        className={`${showErrors ? 'border-red-500 border-2' : ''} select`}
        required={isRequired}
        disabled={disabled}
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
      {showErrors ? <p className='mt-1 text-xs font-medium text-red-500'>{error}</p> : null}
    </div>
  );
};

export { Select };
