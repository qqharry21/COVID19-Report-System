/** @format */

import React, { useEffect, useState } from 'react';
import { getErrorMessage, getErrors } from '../../../utils/validate';

const Checkbox = ({ field, label, name, id, disabled, isRequired, formik }) => {
  return (
    <div className='items-center flex'>
      <input
        className='form-check-input'
        type='checkbox'
        id={id}
        name={name}
        checked={field.value}
        disabled={disabled}
        {...formik.getFieldProps(field.name)}
      />
      <label className='text-sm form-check-label inline-block text-gray-800' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const CheckboxElement = ({ title, text }) => {
  return (
    <>
      <label className='block p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer peer-checked:border-main hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-main h-full'>
        <span> {title} </span>

        <span className='block mt-1 text-xs text-gray-500'>{text}</span>
      </label>
      <svg
        className='absolute w-5 h-5 text-main opacity-0 bottom-4 right-4 peer-checked:opacity-100 z-10'
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

const MutiCheckbox = element => {
  const [checked, setChecked] = useState([]);
  const { id, label, options, isRequired, field, formik, checkbox } = element;
  const [checkedState, setCheckedState] = useState(new Array(options?.length).fill(false));

  const showErrors = getErrors(formik, field);
  const error = getErrorMessage(formik, field);

  useEffect(() => {
    var updatedCheckedState = [];
    var updatedList = [];
    options?.map((attr, index) => {
      if (field.value.includes(attr.title)) {
        updatedCheckedState = [...updatedCheckedState, true];
        updatedList = [...updatedList, attr.title];
      } else {
        updatedCheckedState = [...updatedCheckedState, false];
      }
    });
    setChecked(updatedList);
    setCheckedState(updatedCheckedState);
  }, []);

  const handleOnClick = (value, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    var updatedList = [...checked];
    if (!checkedState[position]) {
      updatedList = [...checked, value];
    } else {
      updatedList.splice(checked.indexOf(value), 1);
    }

    setChecked(updatedList);

    var checkedItems = updatedList.length
      ? updatedList.reduce((total, item) => {
          return total + ', ' + item;
        })
      : '';

    formik.setFieldValue(field.name, checkedItems);
  };
  const handleOnChange = position => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-sm font-medium mb-1'>
          {label}
          {isRequired && <span className='text-red-500 font-medium text-lg ml-1'>*</span>}
        </p>
        <p className='text-xs text-gray-500'>請至少選填一個</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {options?.map((attr, index) => {
          let option = React.cloneElement(checkbox, element);
          option = React.cloneElement(option, attr);
          return (
            <div key={index} className='relative' onClick={() => handleOnClick(attr.title, index)}>
              <input
                className='hidden group peer'
                type='checkbox'
                name={`${field.name}-${index}`}
                id={`${id}-${index}`}
                value={attr.title}
                index={`${index}`}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              {option}
            </div>
          );
        })}
      </div>
      <input
        className={`hidden w-full p-3 text-sm border-gray-200 rounded-lg`}
        type='text'
        id={id}
        name={field.name}
        required={isRequired}
        {...formik.getFieldProps(field.name)}
      />
      {showErrors ? <p className='text-red-500 text-xs mt-1 font-medium'>{error}</p> : null}
    </div>
  );
};

export { Checkbox, MutiCheckbox, CheckboxElement };
