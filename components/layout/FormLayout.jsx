/** @format */

import { useRouter } from 'next/router';
import React from 'react';

const FormLayout = ({ children }) => {
  const router = useRouter();
  return (
    <section className='items-center justify-center w-full'>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
        {/* Content */}
        <div className='flex flex-col items-center space-y-4'>
          {/* Form */}
          <div className='p-8 bg-white rounded-lg shadow-lg h-fit sm:p-12'>
            <div className='pb-4'>
              <div className='flex flex-col items-center justify-center pb-4 space-x-2'>
                <h3 className='font-semibold text-center text-teal-500'>消防局受理防疫案件通報</h3>
                <p className='font-medium text-main'>
                  {router.pathname.includes('add') ? '新增' : '修改'}
                </p>
              </div>
              <hr className='border-gray-200 w-full xs:w-[50%] mx-auto' />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
