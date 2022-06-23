/** @format */

import { dbConnect } from '../../../lib/config/dbConnect';
import User from '../../../models/User';

/** @format */

const handleUser = async (req, res) => {
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        await getAllUsers();
        break;
      case 'PUT':
        await updateUserRoleById(req.body);
        break;
      case 'DELETE':
        await deleteUser(req.query.id);
        break;
      default:
        return res.status(405).json({ message: 'Only for GET, PUT, DELETE requests' });
    }
  } catch (error) {
    console.log('🚨 ~ handler ~ error', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  // GET /api/admin/users
  async function getAllUsers() {
    try {
      const users = await User.find().exec();
      const userArray = users.map(user => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        };
      });
      return res.status(200).json({ userArray });
    } catch (error) {
      console.log('🚨 ~ handler ~ error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  // PUT /api/admin/users
  async function updateUserRoleById(data) {
    console.log('🚨 ~ updateUserRoleById ~ data', data);
    const { id, role } = data;
    try {
      const foundUser = await User.findById(id).exec();

      if (!foundUser) return res.status(404).json({ message: 'User not found' });
      const roles = { User: 2001 };
      if (role === 'Admin') {
        roles.Editor = 1984;
        roles.Admin = 5150;
      } else if (role === 'Editor') roles.Editor = 1984;
      foundUser.roles = roles;

      await foundUser.save();
      return res.status(200).json({ message: `使用者${foundUser.username}，更新權限成功` });
    } catch (error) {
      console.log('🚨 ~ handler ~ error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  // DELETE /api/admin/users
  async function deleteUser(id) {
    try {
      const user = await User.findById(id);
      if (!user) return res.status(204).end();
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: `使用者${user.username}，刪除成功` });
    } catch (error) {
      console.log('🚨 ~ handler ~ error', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export default handleUser;
