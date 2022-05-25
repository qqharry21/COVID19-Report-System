/** @format */

import Image from 'next/image';
import React from 'react';
import { Layout } from './layout';

const Loading = () => {
  return (
    <Layout title='加載中..'>
      <div className='flex h-screen mx-auto items-center'>
        <div className='relative w-40 h-40'>
          <Image src='/loader.gif' alt='loading' layout='fill' objectFit='contain' />
        </div>
      </div>
    </Layout>
  );
};

export default Loading;