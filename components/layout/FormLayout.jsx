/** @format */

import { useRouter } from 'next/router';
import React from 'react';

const FormLayout = ({ children }) => {
  const router = useRouter();
  return (
    <section className='w-full items-center justify-center'>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
        {/* Content */}
        <div className='flex flex-col space-y-4 items-center'>
          {/* Form */}
          <div className='bg-white rounded-lg shadow-lg h-fit p-8 sm:p-12'>
            <div className='pb-4'>
              <div className='flex items-center justify-center pb-4 space-x-2 flex-col'>
                <h3 className='text-teal-500 font-semibold text-center'>消防局受理防疫案件通報</h3>
                <p className='text-main font-medium'>
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
