/** @format */

import ROLES_LIST from '../lib/role';

const verifyRoles = roles => {
  const userRole = Object.values(roles);
  const rolesArray = Object.values(ROLES_LIST);
  const result = userRole.map(role => rolesArray.includes(role)).find(val => val === true);
  return result;
};

export default verifyRoles;

export const isAdmin = roles => {
  const userRole = Object.values(roles);
  const allowedRoles = [ROLES_LIST.Admin];
  const result = userRole.map(role => allowedRoles.includes(role)).find(val => val === true);
  return result;
};

export const isEditor = roles => {
  const userRole = Object.values(roles);
  const allowedRoles = [ROLES_LIST.Admin, ROLES_LIST.Editor];
  const result = userRole.map(role => allowedRoles.includes(role)).find(val => val === true);
  return result;
};

export const isUser = roles => {
  const userRole = Object.values(roles);
  const allowedRoles = [ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User];
  const result = userRole.map(role => allowedRoles.includes(role)).find(val => val === true);
  return result;
};
