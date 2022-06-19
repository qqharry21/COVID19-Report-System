/** @format */

import useSWR from 'swr';
import { Loading, Error } from '../../components';
import { ReportLayout, Layout } from '../../components/layout';
import axios from '../../lib/axios';

export default function ReportPage({ data }) {
  if (!data) return <Loading />;
  if (data.length === 0) return <Error />;
  return (
    <Layout title='統計資料'>
      <ReportLayout data={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await axios.get('/reports').then(res => res.data);
  if (!data) return null;
  return {
    props: {
      data,
    },
  };
}
