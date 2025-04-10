import { lazy } from 'react';

const Students =  lazy(() => import('./components/Gateway'));
const CreateStudent =  lazy(() => import('./components/Create'));
const EditStudent =  lazy(() => import('./components/Edit'));
const StudentInformation =  lazy(() => import('./components/profile/Information'));
const StudentTable =  lazy(() => import('./components/DataTable'));
const Guardians =  lazy(() => import('./components/Guardians'));

export {Students,CreateStudent, EditStudent,StudentTable,Guardians,StudentInformation};


