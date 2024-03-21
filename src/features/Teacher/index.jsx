import { lazy } from 'react';

const Teachers =  lazy(() => import('./components/Teachers'));
const CreateTeacher =  lazy(() => import('./components/CreateTeacher'));
const EditTeacher =  lazy(() => import('./components/EditTeacher'));
const TeacherTable =  lazy(() => import('./components/TeacherTable'));


export {Teachers,CreateTeacher, EditTeacher,TeacherTable};


