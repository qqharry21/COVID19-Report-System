/** @format */

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../';

const Layout = props => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted || !session) return null;

  return (
    <div className='h-screen'>
      {props.meta}
      <Header session={session} />
      <main className='flex w-full min-h-screen'>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
