/** @format */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '../components';
import { Progress } from '../components/progress';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { useProgressStore } from '../hooks/useProgressStore';
import '../styles/globals.css';
import 'animate.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAnimating = useProgressStore(state => state.isAnimating);
  const setIsAnimating = useProgressStore(state => state.setIsAnimating);
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };

    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <Meta />
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}

export default MyApp;
