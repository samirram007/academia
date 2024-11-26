import { lazy } from 'react';

const ExaminationSchedules =  lazy(() => import('./components/DataList'));
const CreateExaminationSchedule =  lazy(() => import('./components/Create'));
const EditExaminationSchedule =  lazy(() => import('./components/Edit'));

export {ExaminationSchedules,CreateExaminationSchedule, EditExaminationSchedule};


