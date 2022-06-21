/** @format */

import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
});

const User = models.User || model('User', UserSchema);
export default User;
