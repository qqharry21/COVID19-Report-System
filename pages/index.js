/** @format */
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { getSession } from 'next-auth/react';
import { Meta } from '../components';

const Home = () => {
  return (
    <Layout meta={<Meta title='首頁' description='Home page' />}>
      <div className='px-4 py-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8'>
        <div className='grid h-screen grid-cols-1 lg:grid-cols-2'>
          <div className='relative z-10 lg:py-16'>
            <div className='relative h-full shadow-lg'>
              <Image
                className='absolute inset-0 object-cover w-full h-full rounded-t-lg lg:rounded-lg '
                src='/home.jpg'
                alt='Indoors house'
                objectFit='cover'
                layout='fill'
                priority
              />
            </div>
          </div>

          <div className='relative flex items-center bg-gray-100 rounded-b-lg lg:rounded-lg'>
            <span className='hidden rounded-l-lg lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16'></span>

            <div className='p-8 sm:p-16 lg:p-24'>
              <h1 className='font-bold'>
                歡迎使用 <p className='text-2xl sm:text-3xl text-main'>新竹市消防局常用系統</p>
              </h1>

              <p className='mt-4 text-gray-600'>
                點選新增案例來新增確診通報，或是點選統計資料查詢已經通報的案例。
              </p>
              <Link href='/add'>
                <a className='inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition-all duration-200 ease-in-out bg-teal-600 border border-teal-600 rounded active:text-teal-500 hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring'>
                  開始使用
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

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
  return {
    props: {
      session,
    },
  };
};

export default Home;
