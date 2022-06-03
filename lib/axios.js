/** @format */
import axios from 'axios';
import { server } from './config';

export default axios.create({
  baseURL: `${server}/api`,
});
