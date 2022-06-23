/** @format */

import Image from 'next/image';
import React from 'react';
import { Layout } from './layout';
import Meta from './Meta';

const Loading = () => {
  return (
    <Layout meta={<Meta title='加載中..' description='Loading page' />}>
      <div className='flex items-center h-screen mx-auto'>
        <div className='relative w-40 h-40'>
          <Image src='/loader.gif' alt='loading' layout='fill' objectFit='contain' priority />
        </div>
      </div>
    </Layout>
  );
};

export default Loading;

export const LoadingImage = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-40 h-40'>
        <Image src='/loader.gif' alt='loading' layout='fill' objectFit='contain' priority />
      </div>
    </div>
  );
};
