/** @format */

import { personal_protection } from '../../utils/data';
import { getObjectValue, paragraph } from '../../utils/CommonUtils';
import { Checkbox, Input } from './field';
import { Field } from 'formik';

const GDPRForm = formik => {
  const { content } = personal_protection;

  return (
    <div className='flex flex-col p-2 leading-7'>
      <p>
        依據個人資料保護法（以下稱個資法）第八條第一項規定，為了確保使用者之個人資料、隱私及權益之保護，當您已閱讀並同意「單位個人資料保護法告知內容」時，即表示您願意以電子文件之方式行使法律所賦予同意之權利，並具有書面同意之效果，若不同意請 
        <span className='text-red-500 font-semibold text-sm xs:text-base sm:text-lg'>
          (以下為本單位依「個人資料保護法」規定，必須向您告知的各項聲明，請您務必詳閱。)
        </span>
      </p>
      {content?.map((data, index) => {
        return (
          <div key={index}>
            <p className='font-bold'>
              {getObjectValue(paragraph, data.title)}、&nbsp;
              {data.text}
            </p>
            {data?.children.map((child, i) => (
              <p className='my-1 ml-2' key={i}>
                (&nbsp;{getObjectValue(paragraph, child.title)}&nbsp;)&nbsp;&nbsp;
                {child.text}
              </p>
            ))}
          </div>
        );
      })}
      {/* Agreement Checkbox */}
      <div className='mx-auto mt-5'>
        <Field
          label='本人已閱讀並明白及同意以上條款及細則'
          name='agreement'
          id='agreement'
          isRequired
          component={Checkbox}
          formik={formik}
        />
      </div>
      <div className='hidden'>
        <Field
          label='本人已閱讀並明白及同意以上條款及細則'
          name='source'
          id='source'
          isRequired
          component={Input}
          formik={formik}
        />
      </div>
    </div>
  );
};

export default GDPRForm;
