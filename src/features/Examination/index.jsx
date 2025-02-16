import { lazy } from 'react';

const Examinations =  lazy(() => import('./components/DataList'));
const CreateExamination =  lazy(() => import('./components/Create'));
const EditExamination =  lazy(() => import('./components/Edit'));

export {Examinations,CreateExamination, EditExamination};


