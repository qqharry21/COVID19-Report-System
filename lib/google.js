/** @format */

import { google } from 'googleapis';
import fs from 'fs';

// const GOOGLE_PRIVATE_KEY = fs.readFileSync('cert.json', 'utf-8');
// console.log('GOOGLE_PRIVATE_KEY', GOOGLE_PRIVATE_KEY);

export const auth = new google.auth.GoogleAuth({
  keyFile: './cert.json',
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
