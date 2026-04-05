import { lazy } from 'react';

const ExaminationTypes =  lazy(() => import('./components/DataList'));
const CreateExaminationType =  lazy(() => import('./components/Create'));
const EditExaminationType =  lazy(() => import('./components/Edit'));

export {ExaminationTypes,CreateExaminationType, EditExaminationType};


