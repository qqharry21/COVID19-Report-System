/** @format */
import { getSession } from 'next-auth/react';
const CanDetailPage = ({ detail }) => {
  return <div>Hi</div>;
};

export default CanDetailPage;

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

  const { type } = ctx.params;
  console.log('🚨 ~ type', type);

  return {
    props: {
      // detail: data,
      session,
    },
  };
};
