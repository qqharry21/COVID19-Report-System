/** @format */

import { useRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import { ReportTable } from '../report';
import { Table } from '../report/ReportTable';
const ReportLayout = () => {
  const router = useRouter();

  const date = moment().format('MM/DD');
  return (
    <section className='bg-gray-200 w-full flex flex-col justify-center space-y-4'>
      {/* Image */}
      {/* <div className='relative w-full '>
        <Image
          src='/background.jpeg'
          alt='photo'
          width={960}
          height={360}
          layout='responsive'
          objectFit='contain'
          priority
        />
      </div> */}
      <div className='p-4 sm:p-8 w-fit mx-auto'>
        <div className='bg-white rounded-lg shadow-lg flex flex-col space-y-4 p-8 '>
          <div className='flex items-center justify-center'>
            <h1 className='justify-center flex mb-1 font-semibold text-main'>
              {router.pathname === '/report' ? '至今日止 總確診數' : `COVID-19 今日(${date})確診數`}
            </h1>
          </div>
          <div
            className='border-t border-gray-100 p-2'
            onClick={e => {
              navigator.clipboard.writeText(e.target.innerText);
            }}>
            報告局長：
            <p className=''> 今日確診數：100</p>
          </div>
        </div>
      </div>
      <div className='flex p-4 sm:p-8'>
        <ReportTable />
      </div>
      <Link href='/' passHref>
        <div className='flex justify-center py-2'>
          <button className='btn btn--outline outline-r inline-flex w-fit' type='button'>
            <p className=''>查看表單</p>
            <svg
              className='h-5 w-5 ml-3'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path stroke='none' d='M0 0h24v24H0z' /> <line x1='10' y1='14' x2='21' y2='3' />
              <path d='M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3' />
            </svg>
          </button>
        </div>
      </Link>
    </section>
  );
};

export default ReportLayout;
// 之後 turn to event detail page
