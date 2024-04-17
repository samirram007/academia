import { lazy } from 'react';

const AcademicSessions =  lazy(() => import('./components/DataList'));
const CreateAcademicSession =  lazy(() => import('./components/Create'));
const EditAcademicSession =  lazy(() => import('./components/Edit'));

export {AcademicSessions,CreateAcademicSession, EditAcademicSession};


