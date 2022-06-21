/** @format */

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const AppConfig = {
  site_name: 'Fire department System',
  title: '新竹市消防局常用系統',
  description: '新竹市消防局常用系統，登記、查詢、更新確診通報資料',
  locale: 'zh-TW',
  keywords: 'COVID19, Hsinchu, Fire, Firefighter, Firefighting, 消防局, 新竹市消防局常用系統, 確診',
};

const Meta = props => {
  const router = useRouter();
  const title = props.title || '載入中...';
  return (
    <>
      <Head>
        <meta charSet='UTF-8' key='charset' />
        <meta name='keywords' content={AppConfig.keywords} />
        <meta name='viewport' content='width=device-width,initial-scale=1' key='viewport' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' key='apple' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' key='icon32' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' key='icon16' />
        <link rel='icon' href='/favicon.ico' key='favicon' />
        <meta property='og:title' content='新竹市消防局常用系統' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/favicon.ico' />
        <meta property='og:description' content={props.description} />
        <meta property='og:site_name' content='新竹市消防局常用系統' />
        <meta property='og:url' content='' />
      </Head>
      <NextSeo
        title={`${title} | ${AppConfig.title}`}
        description={props.description}
        canonical={props?.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props?.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export default Meta;
