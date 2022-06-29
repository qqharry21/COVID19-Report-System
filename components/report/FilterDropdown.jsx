/** @format */

import { Field, FieldArray, Form, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { onKeyDown } from '../../utils/CommonUtils';
import {
  categoryOptions,
  emergencyOptions,
  initialFilter,
  methodOptions,
} from '../../lib/Form.config';
import { FilterCheckbox, Input } from '../form/field';

export const FilterDropdown = ({ setFilter, close }) => {
  const handleSubmit = (values, actions) => {
    setFilter(values);
    close();
  };
  return (
    <div
      className='absolute z-50 flex flex-col w-[22rem] mx-auto mt-1 overflow-auto bg-white divide-y divide-gray-100 rounded-lg shadow-xl min-w-fit'
      role='dialog'
      aria-label='Filters'>
      <header className='p-6 py-4 text-center'>
        <p className='text-lg font-medium text-teal-500'>搜尋條件</p>
      </header>
      <Formik initialValues={initialFilter} onSubmit={handleSubmit}>
        {formik => {
          return (
            <Form autoComplete='off' noValidate onKeyDown={onKeyDown}>
              <main className='flow-root px-6 overflow-y-auto h-96'>
                <div className='divide-y divide-gray-100'>
                  <div className='py-8'>
                    <fieldset>
                      <legend className='text-base font-medium text-main'>查詢範圍</legend>
                      <Field name='option' as='select' className='mt-6 select'>
                        <option value='all'>全部</option>
                        <option value='range'>自選範圍</option>
                        <option value='today'>今天 - {moment().format('YYYY/MM/DD')}</option>
                        {/* <option value='yesterday'>
                          昨天 - {moment().subtract(1, 'days').format('YYYY/MM/DD')}
                        </option> */}
                      </Field>
                      {formik.values.option === 'range' && (
                        <div className='flex flex-col mt-2 space-y-4'>
                          <Field
                            label='開始日期'
                            name='startDate'
                            placeholder='ex : 19990101/1999/01/01'
                            type='text'
                            component={Input}
                            formik={formik}
                          />
                          <Field
                            label='結束日期'
                            name='endDate'
                            placeholder='ex : 19990101/1999/01/01'
                            type='text'
                            component={Input}
                            formik={formik}
                          />
                        </div>
                      )}
                    </fieldset>
                  </div>
                  {/* 受理方式 */}
                  <div className='py-8'>
                    <fieldset>
                      <legend className='text-base font-medium text-main'>受理方式</legend>
                      <FieldArray
                        name='method'
                        render={arrayHelpers => (
                          <ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2'>
                            {methodOptions.map((option, index) => (
                              <li key={index}>
                                <label className='flex items-center text-sm'>
                                  <input
                                    type='checkbox'
                                    name='method'
                                    className='w-6 h-6 border border-gray-200 rounded-md'
                                    checked={formik.values.method.includes(option.name)}
                                    onChange={e => {
                                      if (e.target.checked) {
                                        arrayHelpers.push(option.name);
                                      } else {
                                        const idx = formik.values.method.indexOf(option.name);
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                    value={option.name}
                                  />
                                  <span className='ml-3 text-sm'>{option.name}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      />
                    </fieldset>
                  </div>
                  {/* 案件等級 */}
                  <div className='py-8'>
                    <fieldset>
                      <legend className='text-base font-medium text-main'>案件等級</legend>
                      <FieldArray
                        name='emergency'
                        render={arrayHelpers => (
                          <ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2'>
                            {emergencyOptions.map((option, index) => (
                              <li key={index}>
                                <label className='flex items-center text-sm'>
                                  <input
                                    type='checkbox'
                                    name='emergency'
                                    className='w-6 h-6 border border-gray-200 rounded-md'
                                    checked={formik.values.emergency.includes(option.value)}
                                    onChange={e => {
                                      if (e.target.checked) {
                                        arrayHelpers.push(option.value);
                                      } else {
                                        const idx = formik.values.emergency.indexOf(option.value);
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                    value={option.value}
                                  />
                                  <span className='ml-3 text-sm'>{option.value}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      />
                    </fieldset>
                  </div>
                  {/* 案件類別 */}
                  <div className='py-8'>
                    <fieldset>
                      <legend className='text-base font-medium text-main'>案件類別</legend>
                      <FieldArray
                        name='category'
                        render={arrayHelpers => (
                          <ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2'>
                            {categoryOptions.map((option, index) => (
                              <li key={index}>
                                <label className='flex items-center text-sm'>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    className='w-6 h-6 border border-gray-200 rounded-md'
                                    checked={formik.values.category.includes(option.value)}
                                    onChange={e => {
                                      if (e.target.checked) {
                                        arrayHelpers.push(option.value);
                                      } else {
                                        const idx = formik.values.category.indexOf(option.value);
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                    value={option.value}
                                  />
                                  <span className='ml-3 text-sm'>{option.value}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      />
                    </fieldset>
                  </div>
                  {/* 年齡分佈 */}
                  <div className='py-8'>
                    <fieldset>
                      <legend className='text-base font-medium text-main'>年齡分佈</legend>
                      <ul className='grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2'>
                        <Field name='age.old' label='65歲以上' component={FilterCheckbox} />
                        <Field name='age.young' label='11歲以下' component={FilterCheckbox} />
                      </ul>
                    </fieldset>
                  </div>
                </div>
              </main>
              <footer className='flex items-center justify-between p-6'>
                <button
                  className='text-sm text-gray-500 link link--outline'
                  type='button'
                  onClick={() => {
                    formik.resetForm();
                    setFilter(initialFilter);
                    close('filter');
                  }}>
                  清除條件
                </button>

                <button
                  className='px-5 py-3 font-medium w-fit btn btn--outline outline-r'
                  type='submit'>
                  套用
                </button>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FilterDropdown;
