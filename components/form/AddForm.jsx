/** @format */
import { Field, FieldArray } from 'formik';
import { Checkbox, Input, Select } from './field';
import {
  methodOptions,
  sexOptions,
  categoryOptions,
  captionOptions,
  patientData,
  accompanyData,
} from '../../utils/data';
import toast from 'react-hot-toast';
import { needPreReport } from '../../utils/CommonUtils';
import { Collapse } from '../';

const AddForm = ({ formik, copyText, setCopyTest, reference }) => {
  const patientLength = formik.values.patients?.length || 0;
  const accompanyLength = formik.values.accompany?.length || 0;

  const handleDelete = (index, length, helpers) => {
    if (length - 1 === 0) {
      toast.error('至少要填寫一筆患者資料', { icon: '🚨' });
    } else {
      helpers.remove(index);
    }
  };

  const handleAdd = (data, length, label, title, helpers, num) => {
    if (length < num) {
      helpers.push(data);
      setTimeout(() => {
        const element = document.getElementById(`${label}-${length + 1}`);
        element.scrollIntoView();
      }, 100);
    } else toast.error(`最多只能填寫${num}筆${title}資料`, { icon: '🚨' });
  };

  return (
    <div className='flex flex-col space-y-4'>
      {needPreReport(formik.values.patients) ||
        (formik.values.emergency && (
          <p className='justify-center flex items-center bg-red-500 p-2 text-white rounded-lg w-full sm:w-fit text-xs mx-auto'>
            此案件需初報/結報
          </p>
        ))}
      <div className='grid grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2'>
        <Field
          label='是否為危急個案'
          name='emergency'
          id='emergency'
          isRequired
          component={Checkbox}
          formik={formik}
        />
        <Field
          label='本案編號'
          name='reportId'
          placeholder=''
          type='text'
          id='reportId'
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
          id='date'
          component={Input}
          isRequired
          formik={formik}
        />
        <Field
          label='受理時間'
          name='time'
          placeholder='填入時間'
          type='text'
          id='time'
          component={Input}
          isRequired
          formik={formik}
        />

        <div className='col-span-1 sm:col-span-2 space-y-4'>
          <Field
            label='受理方式'
            name='method'
            options={methodOptions}
            id='method'
            component={Select}
            isRequired
            formik={formik}
          />
          <Field
            label='個案類別'
            options={categoryOptions}
            name='category'
            id='category'
            component={Select}
            isRequired
            formik={formik}
          />
          <Field
            label='地址'
            name='address'
            placeholder='輸入地址'
            type='text'
            id='address'
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
            <div className='col-span-1 sm:col-span-2 flex flex-col space-y-4' id='patient'>
              {formik.values.patients?.map((patient, index) => (
                <Collapse
                  key={index}
                  index={index}
                  data={patient}
                  label='patient'
                  title='患者'
                  handleDelete={() => handleDelete(index, patientLength, arrayHelpers)}>
                  <Field
                    label='患者姓名'
                    name={`patients[${index}].name`}
                    placeholder='輸入姓名'
                    type='text'
                    id={`name-${index + 1}`}
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='性別'
                    name={`patients[${index}].sex`}
                    options={sexOptions}
                    id={`sex-${index + 1}`}
                    component={Select}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='出生日期'
                    name={`patients[${index}].birth`}
                    placeholder='ex : 1999-01-01'
                    type='text'
                    id={`birth-${index + 1}`}
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
                    id={`id-${index + 1}`}
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='聯絡電話'
                    name={`patients[${index}].phone`}
                    placeholder='輸入聯絡電話'
                    type='text'
                    id={`phone-${index + 1}`}
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='症狀'
                    name={`patients[${index}].symptom`}
                    placeholder='輸入症狀'
                    type='text'
                    id={`symptom-${index + 1}`}
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                </Collapse>
              ))}
              <button
                type='button'
                className='mt-4 col-span-1 sm:col-span-2 btn btn--outline outline-r w-fit flex items-center justify-center mx-auto'
                onClick={() => {
                  handleAdd(patientData, patientLength, 'patient', '患者', arrayHelpers, 5);
                }}>
                <svg
                  className='h-5 w-5'
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
            <div className='col-span-1 sm:col-span-2 flex flex-col space-y-4' id='accompany'>
              {formik.values.accompany?.map((person, index) => (
                <Collapse
                  key={index}
                  index={index}
                  data={person}
                  label='accompany'
                  title='陪同者'
                  handleDelete={() => handleDelete(index, accompanyLength, arrayHelpers)}>
                  <Field
                    label='陪同者姓名'
                    name={`accompany[${index}].name`}
                    placeholder='輸入姓名'
                    type='text'
                    id={`accompany-name-${index + 1}`}
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='關係'
                    name={`accompany[${index}].relation`}
                    placeholder='ex : 兒子'
                    type='text'
                    id={`accompany-relation-${index + 1}`}
                    component={Input}
                    isRequired
                    formik={formik}
                  />
                  <Field
                    label='出生日期'
                    name={`accompany[${index}].birth`}
                    placeholder='ex : 1999-01-01'
                    type='text'
                    id={`accompany-birth-${index + 1}`}
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='性別'
                    name={`accompany[${index}].sex`}
                    options={sexOptions}
                    id={`accompany-sex-${index + 1}`}
                    component={Select}
                    formik={formik}
                  />
                  <Field
                    label='身分證字號'
                    name={`accompany[${index}].id`}
                    placeholder='輸入身分證字號'
                    type='text'
                    id={`accompany-id-${index + 1}`}
                    component={Input}
                    formik={formik}
                  />
                  <Field
                    label='聯絡電話'
                    name={`accompany[${index}].phone`}
                    placeholder='輸入聯絡電話'
                    type='text'
                    id={`accompany-phone-${index + 1}`}
                    component={Input}
                    formik={formik}
                  />
                </Collapse>
              ))}
              <button
                type='button'
                className='mt-4 col-span-1 sm:col-span-2 btn btn--outline outline-r w-fit flex items-center justify-center mx-auto z-0'
                onClick={() => {
                  handleAdd(accompanyData, accompanyLength, 'accompany', '陪同者', arrayHelpers, 3);
                }}>
                <svg
                  className='h-5 w-5'
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
          id='car'
          component={Input}
          formik={formik}
        />
        <Field
          label='送往醫院'
          name='hospital'
          placeholder='ex: 台大醫院'
          type='text'
          id='hospital'
          component={Input}
          isRequired
          formik={formik}
        />
        <Field
          label='出勤人員'
          name='member'
          placeholder='填入傷亡清冊的出勤名單'
          type='text'
          id='member'
          component={Input}
          formik={formik}
        />
        <Field
          label='督導人員'
          name='caption'
          options={captionOptions}
          id='caption'
          component={Select}
          formik={formik}
        />

        <hr className='col-span-1 sm:col-span-2' />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 gap-y-4 col-span-1 sm:col-span-2'>
          <Field
            label='出勤時間'
            name='time1'
            placeholder='填入4碼數字'
            type='text'
            id='time1'
            component={Input}
            formik={formik}
          />
          <Field
            label='到場時間'
            name='time2'
            placeholder='填入4碼數字'
            type='text'
            id='time2'
            component={Input}
            formik={formik}
          />
          <Field
            label='離場送往時間'
            name='time3'
            placeholder='填入4碼數字'
            type='text'
            id='time3'
            component={Input}
            formik={formik}
          />
          <Field
            label='到院/到達時間'
            name='time4'
            placeholder='填入4碼數字'
            type='text'
            id='time4'
            component={Input}
            formik={formik}
          />
          <Field
            label='離開時間'
            name='time5'
            placeholder='填入4碼數字'
            type='text'
            id='time5'
            component={Input}
            formik={formik}
          />
          <Field
            label='返隊時間'
            name='time6'
            placeholder='填入4碼數字'
            type='text'
            id='time6'
            component={Input}
            formik={formik}
          />
        </div>
      </div>

      <div className='flex w-full flex-col space-y-4'>
        {needPreReport(formik.values.patients) ||
          (formik.values.emergency && (
            <p className='justify-center flex items-center bg-red-500 p-2 text-white rounded-lg w-full sm:w-fit text-xs mx-auto'>
              此案件需初報/結報
            </p>
          ))}
        <p className='text-center font-semibold text-main'>通報表</p>
        <textarea
          className='w-full px-3 py-2 text-sm border-gray-200 rounded-lg'
          rows='20'
          ref={reference}
          value={copyText}
          onChange={e => {
            setCopyTest(e.target.value);
          }}></textarea>
      </div>
    </div>
  );
};

export default AddForm;
