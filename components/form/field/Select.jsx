/** @format */

import React from 'react';
import { getErrorMessage, getErrors } from '../../../utils/validate';

const Select = ({ field, label, options, name, id, isRequired, formik }) => {
  const showErrors = getErrors(formik, field);
  const error = getErrorMessage(formik, field);
  return (
    <div>
      <label
        htmlFor='countries'
        className='block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400'>
        {label}
        {isRequired && <span className='text-red-500 font-medium text-lg ml-1'>*</span>}
      </label>
      <select
        id={id}
        name={name}
        className={`${showErrors && 'border-red-500 border-2'} select`}
        required={isRequired}
        {...formik.getFieldProps(field.name)}>
        <option value='' disabled>
          請選擇{label}
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
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

const MultipleSelect = () => {
  return <div>MultipleSelect</div>;
};

export { Select, MultipleSelect };
