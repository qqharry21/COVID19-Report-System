/** @format */

import React from 'react';
import CanCard from '../../components/CanCard';

import { Layout } from '../../components/layout';
import { cans } from '../../utils/data';

const CansPage = () => {
  return (
    <Layout title='常用罐頭'>
      <div className='grid justify-center w-full h-full grid-cols-1 gap-6 px-4 mt-6 sm:px-6 lg:px-8 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {/* Card */}
        {cans.map((can, index) => (
          <CanCard key={index} {...can} />
        ))}
      </div>
    </Layout>
  );
};

export default CansPage;
