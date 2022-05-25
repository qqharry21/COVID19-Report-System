/** @format */

import useSWR from 'swr';
import { Loading, Error } from '../../components';
import { ReportLayout, Layout } from '../../components/layout';
import { server } from '../../lib/config';

export default function ReportPage() {
  const { data, error } = useSWR(`${server}/api/getReports`);

  if (error) return <Error />;
  if (!data) return <Loading />;
  return (
    <Layout title='統計資料'>{data.length > 0 ? <ReportLayout data={data} /> : <Error />}</Layout>
  );
}

// export async function getServerSideProps() {
//   const report_response = await fetch(`${server}/api/getReports`);
//   const total_response = await fetch(`${server}/api/getAllReports`);

//   const reports = await report_response.json();
//   const total = await total_response.json();
//   return {
//     props: {
//       reports: reports,
//       total: total,
//     },
//   };
// }
