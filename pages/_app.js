/** @format */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '../components';
import { Progress } from '../components/progress';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import axios from '../lib/axios';
import { useProgressStore } from '../hooks/useProgressStore';
import '../styles/globals.css';
import 'animate.css';

const fetcher = async (...args) => {
  try {
    const res = await axios.get(...args);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }) {
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
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 60000,
      }}>
      <Meta />
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
      <Toaster />
    </SWRConfig>
  );
}

export default MyApp;
