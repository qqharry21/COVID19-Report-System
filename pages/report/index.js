/** @format */
import { ReportLayout, Layout } from '../../components/layout';
import { server } from '../../lib/config';

export default function ReportPage({ data, lengths }) {
  return (
    <Layout title='總表'>
      <ReportLayout data={data} lengths={lengths} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${server}/api/getAllReports`);
  const response1 = await fetch(`${server}/api/getTotal`);

  const data = await response.json();
  const lengths = await response1.json();
  return {
    props: {
      data: data,
      lengths: lengths,
    },
  };
}
