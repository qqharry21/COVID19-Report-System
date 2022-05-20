/** @format */
import { ReportLayout, Layout } from '../components/layout';
import { initialData } from '../utils/data';

export default function Home({ data }) {
  return (
    <Layout title='首頁'>
      <ReportLayout initialData={initialData} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1g6WrUURvJjMZxmtvPusysen9I2-bfAExnVdq1H63OCY/values/總表?alt=json&key=AIzaSyDOdW3j-9iviMHr5vMY7NmzaTfAv54gucM'
  );

  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
