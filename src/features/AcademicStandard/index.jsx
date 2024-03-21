import { lazy } from 'react';

const AcademicStandards =  lazy(() => import('./components/AcademicStandards'));
const CreateAcademicStandard =  lazy(() => import('./components/CreateAcademicStandard'));
const EditAcademicStandard =  lazy(() => import('./components/EditAcademicStandard'));

export {AcademicStandards,CreateAcademicStandard, EditAcademicStandard};


