import { lazy } from 'react';

const ExaminationStandards =  lazy(() => import('./components/DataList'));
const CreateExaminationStandard =  lazy(() => import('./components/Create'));
const EditExaminationStandard =  lazy(() => import('./components/Edit'));

export {ExaminationStandards,CreateExaminationStandard, EditExaminationStandard};


