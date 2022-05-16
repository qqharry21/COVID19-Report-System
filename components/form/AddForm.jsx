/** @format */
import { Field, FieldArray } from 'formik';
import { Checkbox, Input, Select } from './field';
import { methodOptions, sexOptions, categoryOptions, captionOptions } from '../../utils/data';
import toast from 'react-hot-toast';
import { getAge } from '../../utils/CommonUtils';
import { useState } from 'react';

const AddForm = ({ formik, copyText, setCopyTest }) => {
  const patientLength = formik.values.patients.length;
  const accompanyLength = formik.values.accompany.length;
  const [clickedPatient, setClickedPatient] = useState(0);
  const [clickedAccompany, setClickedAccompany] = useState(0);
  const patientData = {
    name: '',
    birth: '1999-01-01',
    emergency: false,
    age: getAge('1999-01-01'),
    sex: '',
    symptom: '',
    id: '',
    phone: '',
  };
  const accompanyData = {
    name: '',
    relation: '',
    birth: '1999-01-01',
    age: getAge('1999-01-01'),
    sex: '',
    id: '',
    phone: '',
  };

  const handleToggle = (index, clicked, setClicked) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  function isEmergency(age, emergency) {
    return age >= 65 || age <= 11 || emergency;
  }

  function needPreReport(patientArray) {
    return (
      patientArray.find(data => {
        if (data.emergency) return true;
      }) !== undefined
    );
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2'>
        <div className='col-span-1 sm:col-span-2 space-y-4'>
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
        </div>
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
            <div className='col-span-1 sm:col-span-2 flex flex-col space-y-4'>
              {formik.values.patients.map((patient, index) => (
                <div
                  key={index}
                  className={`flex flex-col bg-gray-100 space-y-2 hover:shadow-lg duration-200 transition-all rounded-lg p-6 ${
                    clickedPatient === index ? '' : 'shadow-md'
                  }`}
                  id={`patient-${index + 1}`}>
                  {/* Title */}
                  <div
                    className='relative justify-center flex items-center flex-col w-full'
                    onClick={() => {
                      handleToggle(index, clickedPatient, setClickedPatient);
                    }}>
                    <button className='flex absolute h-full left-0' type='button'>
                      <svg
                        className={`h-full w-full text-main ${
                          clickedPatient === index ? '' : 'rotate-180'
                        }`}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='6 15 12 9 18 15' />
                      </svg>
                    </button>
                    <h3 className=' text-main font-extrabold'>患者 {index + 1}</h3>
                    <button
                      className='absolute right-0 col-span-1 sm:col-span-2 w-fit z-10'
                      type='button'
                      onClick={() => {
                        if (patientLength - 1 === 0) {
                          toast.error('至少要填寫一筆患者資料', { icon: '🚨' });
                        } else {
                          arrayHelpers.remove(index);
                        }
                      }}>
                      <svg
                        className='h-5 w-5 text-main hover:text-teal-500'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <polyline points='3 6 5 6 21 6' />
                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                        <line x1='10' y1='11' x2='10' y2='17' />
                        <line x1='14' y1='11' x2='14' y2='17' />
                      </svg>
                    </button>
                  </div>
                  {/* Alert */}
                  <div className='col-span-1 sm:col-span-2 space-y-4'>
                    {isEmergency(getAge(patient.birth), patient.emergency) && (
                      <p className='justify-center flex items-center bg-red-500 p-2 text-white rounded-lg w-full sm:w-fit text-xs mx-auto'>
                        危急個案/65歲以上/11歲以下
                      </p>
                    )}
                  </div>
                  {/* Content */}
                  <div
                    className={`grid grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2 ${
                      clickedPatient === index ? '' : 'hidden'
                    }`}>
                    <div className='col-span-1 sm:col-span-2 space-y-4'>
                      <Field
                        label='是否為危急個案'
                        name={`patients.${index}.emergency`}
                        id={`patients.${index}.emergency`}
                        isRequired
                        component={Checkbox}
                        formik={formik}
                      />
                    </div>
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
                    {/* <Field
                    label='年齡'
                    name={`patients[${index}].age`}
                    placeholder='自動帶出'
                    type='text'
                    id={`age-${index + 1}`}
                    component={Input}
                    disabled
                    isRequired
                    formik={formik}
                  /> */}
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
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='mt-4 col-span-1 sm:col-span-2 btn btn--outline outline-r w-fit flex items-center justify-center mx-auto'
                onClick={() => {
                  if (patientLength < 5) {
                    arrayHelpers.push(patientData);
                    setTimeout(() => {
                      const element = document.getElementById(`patient-${patientLength + 1}`);
                      element.scrollIntoView();
                    }, 100);
                  } else toast.error('最多只能填寫五筆患者資料', { icon: '🚨' });
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
            <div className='col-span-1 sm:col-span-2 flex flex-col space-y-4'>
              {formik.values.accompany.map((person, index) => (
                <div
                  key={index}
                  className={`flex flex-col space-y-2 bg-gray-100 hover:shadow-lg duration-200 transition-all rounded-lg p-6 ${
                    clickedAccompany === index ? '' : 'shadow-md'
                  }`}
                  id={`accompany-${index + 1}`}>
                  {/* Title */}
                  <div
                    className='relative justify-center flex items-center flex-col w-full mb-2'
                    onClick={() => {
                      handleToggle(index, clickedAccompany, setClickedAccompany);
                    }}>
                    <button className='flex absolute h-full left-0' type='button'>
                      <svg
                        className={`h-full w-full text-main ${
                          clickedAccompany === index ? '' : 'rotate-180'
                        }`}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='6 15 12 9 18 15' />
                      </svg>
                    </button>
                    <h3 className=' text-main font-extrabold'>陪同者 {index + 1}</h3>
                    <button
                      className='absolute right-0 col-span-1 sm:col-span-2 w-fit z-10'
                      type='button'
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}>
                      <svg
                        className='h-5 w-5 text-main hover:text-teal-500'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <polyline points='3 6 5 6 21 6' />
                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                        <line x1='10' y1='11' x2='10' y2='17' />
                        <line x1='14' y1='11' x2='14' y2='17' />
                      </svg>
                    </button>
                  </div>
                  {/* Content */}
                  <div
                    className={`grid grid-cols-1 gap-6 gap-y-4 sm:grid-cols-2 ${
                      clickedAccompany === index ? '' : 'hidden'
                    }`}>
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
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='mt-4 col-span-1 sm:col-span-2 btn btn--outline outline-r w-fit flex items-center justify-center mx-auto'
                onClick={() => {
                  if (accompanyLength < 3) {
                    arrayHelpers.push(accompanyData);
                    setTimeout(() => {
                      const element = document.getElementById(`accompany-${accompanyLength + 1}`);
                      element.scrollIntoView();
                    }, 100);
                  } else {
                    toast.error('最多只能填寫三筆筆陪同者資料', { icon: '🚨' });
                  }
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
          label='督導人員'
          name='caption'
          options={captionOptions}
          id='caption'
          component={Select}
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
      </div>

      <div className='flex w-full flex-col space-y-4'>
        {needPreReport(formik.values.patients) && (
          <p className='justify-center flex items-center bg-red-500 p-2 text-white rounded-lg w-full sm:w-fit text-xs mx-auto'>
            此案件需初報/結報
          </p>
        )}
        <textarea
          className='w-full px-3 py-2 text-sm border-gray-200 rounded-lg'
          rows='40'
          value={copyText}
          onChange={e => {
            setCopyTest(e.target.value);
          }}></textarea>
      </div>
    </div>
  );
};

export default AddForm;
