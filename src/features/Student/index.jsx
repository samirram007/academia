import { lazy } from 'react';

const Students =  lazy(() => import('./components/Students'));
const CreateStudent =  lazy(() => import('./components/Create'));
const EditStudent =  lazy(() => import('./components/Edit'));
<<<<<<< HEAD
const StudentInformation =  lazy(() => import('./components/Information'));
=======
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
const StudentTable =  lazy(() => import('./components/DataTable'));
const Guardians =  lazy(() => import('./components/Guardians'));

export {Students,CreateStudent, EditStudent,StudentTable,Guardians,StudentInformation};


