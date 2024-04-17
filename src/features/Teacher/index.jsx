import { lazy } from 'react';

const Teachers =  lazy(() => import('./components/DataList'));
const CreateTeacher =  lazy(() => import('./components/Create'));
const EditTeacher =  lazy(() => import('./components/Edit'));
const TeacherTable =  lazy(() => import('./components/DataTable'));


export {Teachers,CreateTeacher, EditTeacher,TeacherTable};


