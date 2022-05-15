/** @format */

import Image from 'next/image';
import React from 'react';

const NewsLayout = () => {
  return (
    <section className='bg-gray-200 w-full flex items-center'>
      <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
        {/* Content */}
        <div className={`grid grid-cols-1 gap-x-16 gap-y-8 ${step === 0 ? 'lg:grid-cols-5' : ''}`}>
          {/* Left && Top */}
          {step === 0 && (
            <div className='lg:py-12 lg:col-span-2 mx-auto flex flex-col'>
              {/* Title */}
              <h1 className=' justify-center text-4xl flex mb-1 font-semibold text-main'>
                {title}
              </h1>
              <hr className='border-gray-400 w-full xs:w-[80%] mx-auto' />
              {/* Description */}
              <p className=' text-lg mt-2 w-full xs:w-[75%] mx-auto xs:px-0 px-2'>{description}</p>
              {/* Option (e.x. deadline、address) */}
              <div className='mt-8 text-sm mx-auto'>
                <div className='flex items-center'>
                  回饋單截止日期：
                  <span className='text-2xl font-bold text-teal-600'>2022/11/11</span>
                </div>
                <div className='flex mt-2 text-sm xs:text-base sm:text-lg'>
                  地址：
                  <address className='not-italic'>台北市,中山區,中山北路一段1號</address>
                </div>
              </div>
            </div>
          )}
          {/* Right && Bottom */}
          <div
            className={`p-8 bg-white rounded-lg shadow-lg h-fit sm:p-12 ${
              step === 0 ? ' lg:col-span-3' : ''
            }`}>
            {/* Title */}
            {!isFirstStep() && (
              <div className='pb-4'>
                <div className='flex items-center justify-center pb-4 space-x-2'>
                  <div className='relative w-32 h-20'>
                    <Image
                      src='/project_logo.png'
                      alt='project_logo'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  <h1 className='text-2xl text-main font-semibold text-center'>
                    {currentChild.props?.title}
                  </h1>
                </div>
                <hr className='border-gray-200 w-full xs:w-[50%] mx-auto' />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLayout;
