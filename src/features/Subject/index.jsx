import { lazy } from 'react';

const Subjects =  lazy(() => import('./components/DataList'));
const CreateSubject =  lazy(() => import('./components/Create'));
const EditSubject =  lazy(() => import('./components/Edit'));

export {Subjects,CreateSubject, EditSubject};


