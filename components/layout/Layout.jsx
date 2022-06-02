/** @format */

import { NextSeo } from 'next-seo';
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../';

const Layout = ({ children, title, description, className }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className='h-screen'>
      <NextSeo
        title={
          title.includes('首頁') ? '新竹市消防局常用系統' : title.concat(' | 新竹市消防局常用系統')
        }
        description={description}
        openGraph={{ title, description }}
      />
      <Header />
      <main className='flex min-h-screen'>{children}</main>
      <Footer />
      {/* <Toaster position='bottom-right' reverseOrder={false} /> */}
    </div>
  );
};

export default Layout;
