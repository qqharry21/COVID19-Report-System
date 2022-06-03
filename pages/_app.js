/** @format */

import { Meta } from '../components';
import { Toaster } from 'react-hot-toast';
import 'animate.css';
import '../styles/globals.css';
import { SWRConfig } from 'swr';
import axios from '../lib/axios';

const fetcher = async (...args) => {
  try {
    const res = await axios.get(...args);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 60000,
      }}>
      <Meta />
      <Component {...pageProps} />
      <Toaster />
    </SWRConfig>
  );
}

export default MyApp;
