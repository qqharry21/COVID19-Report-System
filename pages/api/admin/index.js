/** @format */

import { dbConnect } from '../../../lib/config/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

const handleAdminChange = async (req, res) => {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Only for PUT requests' });
  const { username, email, password, confirmPassword } = req.body;

  await dbConnect();

  if (password !== confirmPassword) return res.status(400).json({ message: '密碼不相符' });

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.status(401).json({ message: `查不到 ${username} 此使用者` }); // 401 Unauthorized

  try {
    if (password) {
      const isSame = await bcrypt.compare(password, foundUser.password);
      if (isSame) return res.status(401).json({ message: '密碼與舊密碼相同' });

      foundUser.password = await bcrypt.hash(password, 10);
      foundUser.refreshToken = '';
    }
    if (email) {
      if (foundUser.email === email) return res.status(401).json({ message: '信箱與舊信箱相同' });

      const isExist = await User.findOne({ email }).exec();
      if (isExist) return res.status(401).json({ message: '此信箱已被使用' });

      foundUser.email = email;
    }
    await foundUser.save();

    return res.status(200).json({ message: '已更改，請重新登入' });
  } catch (error) {
    console.log('🚨 ~ handler ~ error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default handleAdminChange;
