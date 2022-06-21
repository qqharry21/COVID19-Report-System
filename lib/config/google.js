/** @format */

import { google } from 'googleapis';

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

// need to remove \n from private key(直接換行)
// https://github.com/vercel/vercel/issues/749#issuecomment-870262203
