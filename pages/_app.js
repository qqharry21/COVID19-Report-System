/** @format */

import { Meta } from '../components';
import { Toaster } from 'react-hot-toast';
import 'animate.css';
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
