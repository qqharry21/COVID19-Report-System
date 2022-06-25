/** @format */
import User from '../../models/User';

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  console.log('🚨 ~ handleLogout ~ cookies', cookies);
  // if (!cookies?.jwt) return res.sendStatus(204); // No Content
  // const refreshToken = cookies.jwt;

  // If refreshToken in DB
  // const foundUser = await User.findOne({ refreshToken }).exec();

  // Delete refreshToken from DB
  // foundUser.refreshToken = '';
  // const result = await foundUser.save();
  // console.log('Refresh token deleted: ', result);

  res.status(204).send(); // No Content
};

export default handleLogout;
