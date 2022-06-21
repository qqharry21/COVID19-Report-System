/** @format */

import { NextSeo } from 'next-seo';
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../';

const Layout = props => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className='h-screen'>
      {props.meta}
      <Header />
      <main className='flex w-full min-h-screen'>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
