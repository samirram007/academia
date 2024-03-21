import { lazy } from 'react';

const AcademicYears =  lazy(() => import('./components/AcademicYears'));
const CreateAcademicYear =  lazy(() => import('./components/CreateAcademicYear'));
const EditAcademicYear =  lazy(() => import('./components/EditAcademicYear'));

export {AcademicYears,CreateAcademicYear, EditAcademicYear};


