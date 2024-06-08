import { lazy } from 'react';

const StudentIdCards =  lazy(() => import('./components/DataList'));
const CreateStudentIdCard =  lazy(() => import('./components/Create'));
const EditStudentIdCard =  lazy(() => import('./components/Edit'));

export {StudentIdCards,CreateStudentIdCard, EditStudentIdCard};


