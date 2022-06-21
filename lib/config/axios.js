/** @format */
import axios from 'axios';
import { server } from './config';

export default axios.create({
  baseURL: `${server}/api`,
});

// const fetcher = async (...args) => {
//   try {
//     const res = await axios.get(...args);
//     return res.data;
//   } catch (err) {
//     throw err.response.data;
//   }
// };
