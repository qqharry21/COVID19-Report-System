/** @format */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../../../lib/config/axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '輸入使用者代號' },
        password: { label: 'Password', type: 'password', placeholder: '輸入8位數密碼' },
      },
      async authorize(credentials) {
        const response = await axios.post('/login', {
          data: credentials,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        // If no error and we have user data, return it
        // Returning token to set in session
        if (response.status !== 200) throw new Error(data.message);
        else if (response.status === 200 && data) return data;
        else return null;
      },
    }),
  ],
  session: { jwt: true },
  database: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        return {
          ...token,
          user: user.user,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },
  pages: {
    signIn: '/login', //Need to define custom login page (if using)
  },
  debug: process.env.NODE_ENV === 'development',
});
