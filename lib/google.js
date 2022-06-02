/** @format */

import { google } from 'googleapis';

// const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY);
// console.log('GOOGLE_PRIVATE_KEY', privateKey);

export const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
