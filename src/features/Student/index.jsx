import { lazy } from 'react';

const Students =  lazy(() => import('./components/Students'));
const CreateStudent =  lazy(() => import('./components/CreateStudent'));
const EditStudent =  lazy(() => import('./components/EditStudent'));
const StudentTable =  lazy(() => import('./components/StudentTable'));
const Guardians =  lazy(() => import('./components/Guardians'));

export {Students,CreateStudent, EditStudent,StudentTable,Guardians};


