/** @format */

import { Loading, Error, Meta } from '../../components';
import { ReportLayout, Layout } from '../../components/layout';
import axios from '../../lib/config/axios';
import { getSession } from 'next-auth/react';

export default function ReportPage({ data }) {
  if (!data) return <Loading />;
  if (data.length === 0) return <Error />;
  return (
    <Layout meta={<Meta title='統計資料' description='Reports' />}>
      <ReportLayout data={data} />
    </Layout>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const data = await axios.get('/reports').then(res => res.data);
  return {
    props: {
      data,
      session,
    },
  };
};
