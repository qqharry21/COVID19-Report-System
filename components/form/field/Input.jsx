/** @format */

import React, { useState, useEffect } from 'react';
import { getAge } from '../../../utils/CommonUtils';
import { getErrorMessage, getErrors } from '../../../utils/validate';

const Input = ({ field, label, placeholder, id, name, type, formik, isRequired, disabled }) => {
  const showErrors = getErrors(formik, field);
  const error = getErrorMessage(formik, field);

  return (
    <div>
      <label className='text-sm font-medium' htmlFor={id}>
        {label}
        {isRequired && <span className='text-red-500 font-medium text-base ml-1'>*</span>}
      </label>
      <input
        className={`w-full p-3 text-sm border-gray-200 rounded-lg ${
          disabled ? 'bg-gray-100' : ''
        }  ${showErrors ? 'border-red-500 border-2' : ''}`}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        required={isRequired}
        disabled={disabled}
        {...formik.getFieldProps(field.name)}
      />
      {showErrors ? <p className='text-red-500 text-xs mt-1 font-medium'>{error}</p> : null}
    </div>
  );
};

const Textarea = ({ id, label, name, placeholder, field, formik, size }) => {
  const showErrors = getErrors(formik, field);
  const error = getErrorMessage(formik, field);
  return (
    <div>
      <label className='text-sm font-medium' htmlFor={id}>
        {label}
      </label>
      <textarea
        className='w-full px-3 py-2 text-sm border-gray-200 rounded-lg'
        placeholder={placeholder}
        rows={size}
        name={name}
        id={id}
        {...formik.getFieldProps(field.name)}></textarea>
      {showErrors ? <p className='text-red-500 text-xs mt-1 font-medium'>{error}</p> : null}
    </div>
  );
};

export { Input, Textarea };
