import { lazy } from 'react';

const Subjects =  lazy(() => import('./Subjects'));
const CreateSubject =  lazy(() => import('./CreateSubject'));
const EditSubject =  lazy(() => import('./EditSubject'));

export {Subjects,CreateSubject, EditSubject};


