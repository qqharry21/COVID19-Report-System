/** @format */

import { dbConnect } from '../../lib/config/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { username, password } = req.body.data;

  await dbConnect();

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) return res.status(401).json({ message: `查不到 ${username} 此使用者` }); // 401 Unauthorized

  try {
    // evaluate password

    const isValid = await bcrypt.compare(password, foundUser.password);

    if (!isValid) return res.status(401).json({ message: '使用者代號/密碼 錯誤' }); // 401 Unauthorized

    const roles = Object.values(foundUser.roles);
    // create JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
    // verify to get new access token
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Saving Refresh Token with current user to DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Cookies.set('jwt', refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'None',
    //   // secure: true, // only for https
    //   maxAge: 1000 * 60 * 60 * 24,
    // });

    return res.status(200).json({
      token: accessToken,
      user: {
        username: foundUser.username,
        roles: foundUser.roles,
        email: foundUser.email,
      },
      refreshToken: foundUser.refreshToken,
      message: 'Login Successful',
    }); // 200 OK
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' }); // 500 Internal Server Error
  }
};

export default handleLogin;
