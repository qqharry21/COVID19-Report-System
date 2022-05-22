/** @format */
import { Layout, FormLayout } from '../components/layout';
import { server } from '../lib/config';

export default function AddReport({ maxIds }) {
  return (
    <Layout title='新增案例'>
      <FormLayout maxIds={maxIds} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${server}/api/getLatestId`);

  const data = await response.json();
  return {
    props: {
      maxIds: data,
    },
  };
}
