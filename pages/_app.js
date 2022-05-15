/** @format */

import { Meta } from '../components';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
