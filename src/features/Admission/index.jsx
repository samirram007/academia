import { lazy } from 'react';

const Admissions =  lazy(() => import('./components/DataList'));
const CreateAdmission =  lazy(() => import('./components/Create'));
const EditAdmission =  lazy(() => import('./components/Edit'));

export {Admissions,CreateAdmission, EditAdmission};


