import { lazy } from 'react';

const Users =  lazy(() => import('./Users'));
const CreateUser =  lazy(() => import('./CreateUser'));
const EditUser =  lazy(() => import('./EditUser'));
const UserTable =  lazy(() => import('./UserTable'));

export {Users,CreateUser, EditUser,UserTable};


