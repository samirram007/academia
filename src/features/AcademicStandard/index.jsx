import { lazy } from 'react';

const AcademicStandards =  lazy(() => import('./components/DataList'));
const CreateAcademicStandard =  lazy(() => import('./components/Create'));
const EditAcademicStandard =  lazy(() => import('./components/Edit'));

export {AcademicStandards,CreateAcademicStandard, EditAcademicStandard};


