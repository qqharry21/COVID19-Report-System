/** @format */

import React, { useState, useEffect } from 'react';
import axios from '../../lib/config/axios';
import { LoadingImage } from '../Loading';
import UserCard from './UserCard';

const PermissionPanel = ({ user }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get('/admin/users');
      if (res.status === 200) {
        const { userArray } = res.data;
        setUsers(() => {
          return userArray.filter(arr => arr.username !== user.username);
        });
      }
    }
    getUsers();
  }, []);
  return (
    <>
      {users.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 '>
          {users.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </div>
      ) : (
        <LoadingImage />
      )}
    </>
  );
};

export default PermissionPanel;
