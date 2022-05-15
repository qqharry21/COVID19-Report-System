/** @format */
import { ReportLayout, Layout } from '../components/layout';
import { initialData } from '../utils/data';

export default function Home() {
  return (
    <Layout title='首頁'>
      <ReportLayout initialData={initialData} />
    </Layout>
  );
}

// export async function getStaticPaths() {}
// export async function getStaticProps() {}
