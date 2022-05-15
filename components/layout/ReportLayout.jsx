/** @format */

import { useRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import { ReportTable } from '../report';
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
      <div className='max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 flex flex-col space-y-4 h-fit '>
        {/* Content */}
        <div className={`flex flex-col space-y-8`}>
          {/* Title */}
          <div className='p-4 bg-white rounded-lg shadow-lg sm:p-8 lg:py-10 mx-auto flex flex-col space-y-8'>
            <div className='flex items-center justify-center'>
              {/* <div className='relative w-32 h-20'>
                <Image src='/ADI Logo.png' alt='project_logo' layout='fill' objectFit='contain' />
              </div> */}
              <h1 className='justify-center flex mb-1 font-semibold text-main'>
                {router.pathname === '/report'
                  ? '至今日止 總確診數'
                  : `COVID-19 今日(${date})確診數`}
              </h1>
            </div>
            {/* 統計 */}
            <div
              className='border-t border-gray-100 p-2'
              onClick={e => {
                navigator.clipboard.writeText(e.target.innerText);
              }}>
              報告局長：
              <p className=''> 今日確診數：100</p>
            </div>
          </div>
          {/* Right && Bottom */}
          {/* <ReportTable /> */}
        </div>
        {/* Signup Button */}
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
      </div>
    </section>
  );
};

export default ReportLayout;
// 之後 turn to event detail page
