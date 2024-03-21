import { lazy } from 'react';

const AcademicClasses =  lazy(() => import('./components/AcademicClasses'));
const CreateAcademicClass =  lazy(() => import('./components/CreateAcademicClass'));
const EditAcademicClass =  lazy(() => import('./components/EditAcademicClass'));

export {AcademicClasses,CreateAcademicClass, EditAcademicClass};


