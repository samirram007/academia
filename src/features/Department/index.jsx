import { lazy } from 'react';

const Departments =  lazy(() => import('./components/Departments'));
const CreateDepartment =  lazy(() => import('./components/CreateDepartment'));
const EditDepartment =  lazy(() => import('./components/EditDepartment'));

export {Departments,CreateDepartment, EditDepartment};


