import { lazy } from 'react';

const Departments =  lazy(() => import('./Departments'));
const CreateDepartment =  lazy(() => import('./CreateDepartment'));
const EditDepartment =  lazy(() => import('./EditDepartment'));

export {Departments,CreateDepartment, EditDepartment};


