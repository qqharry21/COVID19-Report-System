/** @format */

import User from '../../models/User';
import bcrypt from 'bcrypt';
import { dbConnect } from '../../lib/config/dbConnect';
import verifyRoles from '../../utils/verifyRoles';

const handleNewUser = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { username, password, email, roles } = req.body.data;
  await dbConnect();

  // Check if the roles are allowed
  const result = verifyRoles(roles);
  if (!result) return res.status(401).json({ message: '未授權' });

  // Check if the username, password and email aren't empty
  if (!username || !password || !email) return res.status(400).json({ message: '請填寫正確欄位' }); // 400 Bad Request

  // check if user already exists
  const duplicateUser = await User.findOne({ email }).exec();
  if (duplicateUser) return res.status(409).json({ message: '使用者已存在' }); // 409 Conflict

  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    // stored the new user

    const user = new User({
      username: username,
      // roles are defaulted to 'user'
      password: hashedPassword,
      email: email,
    });
    await user.save();

    res.status(200).json({ message: `使用者 ${username} 成功註冊` }); // 200 OK
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' }); // 500 Internal Server Error
  }
};

export default handleNewUser;
