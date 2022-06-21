/** @format */
import { Field, FieldArray } from 'formik';
import { Input, Select } from './field';
import {
  methodOptions,
  sexOptions,
  categoryOptions,
  captionOptions,
  patientData,
  accompanyData,
  emergencyOptions,
} from '../../lib/data';
import toast from 'react-hot-toast';

import { CollapseField } from '../';

const AddForm = ({ formik, copyText, setCopyText, reference }) => {
  const patientLength = formik.values.patients?.length || 0;
  const accompanyLength = formik.values.accompany?.length || 0;

  const handleDelete = (index, length, helpers, min) => {
    if (length === min) {
      toast.error('至少要填寫一筆患者資料', { icon: '🚨', id: 'error' });
    } else {
      helpers.remove(index);
    }
  };

  const handleAdd = (data, length, label, title, helpers, max) => {
    if (length < max) {
      helpers.push(data);
      setTimeout(() => {
        const element = document.getElementById(`${label}-${length + 1}`);
        element.scrollIntoView();
      }, 100);
    } else toast.error(`最多只能填寫${max}筆${title}資料`, { icon: '🚨', id: 'error' });
  };

  return (
    <div className='flex flex-col space-y-4'>
      {formik.values.emergency !== '一般' && (
        <p className='flex items-center justify-center w-full p-2 mx-auto text-xs text-white bg-red-500 rounded-lg sm:w-fit'>
          此案件需初報/結報
        </p>
      )}
      <div className='grid grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2'>
        <div
          className={`col-span-1 grid gap-x-2 ${
            formik.values.emergency !== '一般' ? 'grid-cols-2' : 'grid-cols-1'
          }`}>
          <Field
            label='案件緊急程度'
            name='emergency'
            isRequired
            formik={formik}
            options={emergencyOptions}
            component={Select}
            valueOption
          />
          {formik.values.emergency !== '一般' && (
            <Field
              label='症狀'
              name='emergency_detail'
              placeholder='請填寫'
              type='text'
              component={Input}
              isRequired
              formik={formik}
            />
          )}
        </div>
        <Field
          label='本案編號'
          name='reportId'
          placeholder=''
          type='text'
          disabled
          component={Input}
          isRequired
          formik={formik}
        />
        <Field
          label='受理日期'
          name='date'
          placeholder='填入日期'
          type='text'
          component={Input}
          isRequired
          formik={formik}
        />
        <Field
          label='受理時間'
          name='time'
          placeholder='填入時間'
          type='text'
          component={Input}
          isRequired
          formik={formik}
        />

        <div className='col-span-1 space-y-4 sm:col-span-2'>
          <Field
            label='受理方式'
            name='method'
            options={methodOptions}
            component={Select}
            isRequired
            formik={formik}
          />
          <Field
            label='個案類別'
            options={categoryOptions}
            name='category'
            component={Select}
            isRequired
            valueOption
            formik={formik}
          />
          <Field
            label='地址'
            name='address'
            placeholder='輸入地址'
            type='text'
            component={Input}
            isRequired
            formik={formik}
          />
          <hr className='' />
        </div>

        {/* Patient */}
        <FieldArray
          name='patients'
          render={arrayHelpers => (
            <div className='flex flex-col col-span-1 space-y-4 sm:col-span-2' id='patient'>
              {formik.values.patients?.map((patient, index) => (
                <CollapseField
                  key={index}
                  index={index}
                  data={patient}
                  label='patient'
                  title='患者'
                  handleDelete={() => handleDelete(index, patientLength, arrayHelpers, 1)}>
                  <Field
                    label='患者姓名'
                    name={`patients[${index}].name`}
                    placeholder='輸入姓名'
                    type='text'
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='性別'
                    name={`patients[${index}].sex`}
                    options={sexOptions}
                    component={Select}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='出生日期'
                    name={`patients[${index}].birth`}
                    placeholder='ex : 1999-01-01'
                    type='text'
                    component={Input}
                    index={index}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='身分證字號'
                    name={`patients[${index}].id`}
                    placeholder='輸入身分證字號'
                    type='text'
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='聯絡電話'
                    name={`patients[${index}].phone`}
                    placeholder='輸入聯絡電話'
                    type='text'
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='症狀'
                    name={`patients[${index}].symptom`}
                    placeholder='輸入症狀'
                    type='text'
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                </CollapseField>
              ))}
              <button
                type='button'
                className='flex items-center justify-center col-span-1 mx-auto mt-4 sm:col-span-2 btn btn--outline outline-r w-fit'
                onClick={() => {
                  handleAdd(patientData, patientLength, 'patient', '患者', arrayHelpers, 5);
                }}>
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                新增患者
              </button>

              <hr className='' />
            </div>
          )}
        />
        {/* Accompany */}
        <FieldArray
          name='accompany'
          render={arrayHelpers => (
            <div className='flex flex-col col-span-1 space-y-4 sm:col-span-2' id='accompany'>
              {formik.values.accompany?.map((person, index) => (
                <CollapseField
                  key={index}
                  index={index}
                  data={person}
                  label='accompany'
                  title='陪同者'
                  handleDelete={() => handleDelete(index, accompanyLength, arrayHelpers, 0)}>
                  <Field
                    label='陪同者姓名'
                    name={`accompany[${index}].name`}
                    placeholder='輸入姓名'
                    type='text'
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='關係'
                    name={`accompany[${index}].relation`}
                    placeholder='ex : 兒子'
                    type='text'
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='出生日期'
                    name={`accompany[${index}].birth`}
                    placeholder='ex : 1999-01-01'
                    type='text'
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='性別'
                    name={`accompany[${index}].sex`}
                    options={sexOptions}
                    component={Select}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='身分證字號'
                    name={`accompany[${index}].id`}
                    placeholder='輸入身分證字號'
                    type='text'
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='聯絡電話'
                    name={`accompany[${index}].phone`}
                    placeholder='輸入聯絡電話'
                    type='text'
                    component={Input}
                    formik={formik}
                  />
                </CollapseField>
              ))}
              <button
                type='button'
                className='z-0 flex items-center justify-center col-span-1 mx-auto mt-4 sm:col-span-2 btn btn--outline outline-r w-fit'
                onClick={() => {
                  handleAdd(accompanyData, accompanyLength, 'accompany', '陪同者', arrayHelpers, 3);
                }}>
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                新增陪同者
              </button>
              <hr className='' />
            </div>
          )}
        />

        <Field
          label='分隊車輛'
          name='car'
          placeholder='ex: 光復92'
          type='text'
          component={Input}
          formik={formik}
        />
        <Field
          label='送往醫院'
          name='hospital'
          placeholder='ex: 台大醫院'
          type='text'
          component={Input}
          isRequired
          formik={formik}
        />
        <Field
          label='出勤人員'
          name='member'
          placeholder='填入傷亡清冊的出勤名單'
          type='text'
          component={Input}
          formik={formik}
        />
        <Field
          label='督導人員'
          name='caption'
          options={captionOptions}
          valueOption
          component={Select}
          formik={formik}
        />

        <hr className='col-span-1 sm:col-span-2' />
        <div className='grid grid-cols-1 col-span-1 gap-6 sm:grid-cols-3 gap-y-4 sm:col-span-2'>
          <Field
            label='出勤時間'
            name='time1'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
          <Field
            label='到場時間'
            name='time2'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
          <Field
            label='離場送往時間'
            name='time3'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
          <Field
            label='到院/到達時間'
            name='time4'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
          <Field
            label='離開時間'
            name='time5'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
          <Field
            label='返隊時間'
            name='time6'
            placeholder='填入4碼數字'
            type='text'
            component={Input}
            formik={formik}
          />
        </div>
      </div>

      <div className='flex flex-col w-full space-y-4'>
        {formik.values.emergency !== '一般' && (
          <p className='flex items-center justify-center w-full p-2 mx-auto text-xs text-white bg-red-500 rounded-lg sm:w-fit'>
            此案件需初報/結報
          </p>
        )}
        <p className='font-semibold text-center text-main'>通報表</p>
        <textarea
          className='w-full px-3 py-2 text-sm border-gray-200 rounded-lg'
          rows='20'
          ref={reference}
          value={copyText}
          onChange={e => {
            setCopyText(e.target.value);
          }}></textarea>
      </div>
    </div>
  );
};

export default AddForm;
