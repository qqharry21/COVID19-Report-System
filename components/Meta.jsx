/** @format */

import Head from 'next/head';
import PropTypes from 'prop-types';

const Meta = ({ keywords, description, image }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta property='og:title' content='新竹市消防局確診通報系統' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={image ? image : '/logo.png'} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='新竹市消防局確診通報系統' />
      <meta property='og:url' content='' />
      {/* <meta name='fb:app_id' content='' /> */}

      <link rel='icon' href='/logo.png' />
    </Head>
  );
};

Meta.defaultProps = {
  title: '新竹市消防局確診通報系統',
  keywords: 'COVID19, Hsinchu, Fire, Firefighter, Firefighting, 消防局, 消防局確診通報系統, 確診',
  description: '新竹市消防局確診通報系統，登記、查詢、更新確診通報資料',
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
};

export default Meta;
