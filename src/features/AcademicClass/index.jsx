import { lazy } from 'react';

const AcademicClasses =  lazy(() => import('./components/DataList'));
const CreateAcademicClass =  lazy(() => import('./components/Create'));
const EditAcademicClass =  lazy(() => import('./components/Edit'));

export {AcademicClasses,CreateAcademicClass, EditAcademicClass};


