/** @format */

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useLeavePageConfirm } from '../../hooks/useLeavePageConfirm';
import axios from '../../lib/config/axios';
import UserCard from './UserCard';

const PermissionPanel = ({ user }) => {
  const [users, setUsers] = useState();
  useLeavePageConfirm();
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
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 '>
        {users?.map((user, index) => {
          return <UserCard key={index} user={user} />;
        })}
        <div className='flex items-center justify-center w-full'>
          <Link href='/register'>
            <a className='p-6 transition-all duration-200 ease-out border border-dashed rounded-md hover:border-gray-400 group hover:shadow-sm'>
              <svg
                className='w-8 h-8 text-gray-300 transition-colors duration-200 ease-out group-hover:text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PermissionPanel;
