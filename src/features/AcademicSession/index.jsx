import { lazy } from 'react';

const AcademicSessions =  lazy(() => import('./components/AcademicSessions'));
const CreateAcademicSession =  lazy(() => import('./components/CreateAcademicSession'));
const EditAcademicSession =  lazy(() => import('./components/EditAcademicSession'));

export {AcademicSessions,CreateAcademicSession, EditAcademicSession};


