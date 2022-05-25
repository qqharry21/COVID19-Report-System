/** @format */
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout title='首頁'>
      <div className='px-4 py-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:h-screen'>
          <div className='relative z-10 lg:py-16'>
            <div className='relative h-64 sm:h-80 lg:h-full shadow-lg'>
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
            <span className='hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16 rounded-l-lg'></span>

            <div className='p-8 sm:p-16 lg:p-24'>
              <h1 className='font-bold'>
                歡迎使用 <p className='text-2xl sm:text-3xl text-main'>確診通報管理系統</p>
              </h1>

              <p className='mt-4 text-gray-600'>
                點選新增案例來新增確診通報，或是點選統計資料查詢已經通報的案例。
              </p>
              <Link href='/add'>
                <a className='inline-block px-12 py-3 mt-8 text-sm font-medium text-white bg-teal-600 border border-teal-600 rounded active:text-teal-500 hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring duration-200 transition-all ease-in-out'>
                  開始使用
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
