/** @format */

import React from 'react';
import { server } from '../../lib/config';
import { Layout } from '../../components/layout';
const ReportDetailPage = ({ data }) => {
  console.log('data', data);

  return <Layout title={`案件${data.reportId}`}>ReportDetailPage</Layout>;
};

export default ReportDetailPage;

export const getServerSideProps = async context => {
  const { reportId } = context.query;
  const response = await fetch(`${server}/api/getReport?reportId=${reportId}`);

  const data = await response.json();
  return {
    props: {
      data: data[0],
    },
  };
};
