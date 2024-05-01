import { lazy } from 'react';

const SchoolTypes =  lazy(() => import('./components/SchoolTypes'));
const CreateSchoolType =  lazy(() => import('./components/CreateSchoolType'));
const EditSchoolType =  lazy(() => import('./components/EditSchoolType'));

export {SchoolTypes,CreateSchoolType, EditSchoolType};


