/** @format */
import { ReportLayout, Layout } from '../../components/layout';
import { server } from '../../lib/config';

export default function ReportPage({ data, total }) {
  return (
    <Layout title='總表'>
      <ReportLayout data={data} total={total} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const report_response = await fetch(`${server}/api/getAllReports`);
  const total_response = await fetch(`${server}/api/getTotal`);

  const reports = await report_response.json();
  const total = await total_response.json();
  return {
    props: {
      data: reports,
      total: total,
    },
  };
}
